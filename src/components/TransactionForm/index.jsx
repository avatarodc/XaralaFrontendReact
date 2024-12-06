import React from 'react';
import { transactionService } from '../../services/transactionService';
import SuccessModal from './SuccessModal';

const TransactionForm = ({ visible, onCancel, onSuccess, transaction }) => {
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const formRef = React.useRef(null);
    const [modalState, setModalState] = React.useState({
        isOpen: false,
        type: 'success',
        mode: 'create'
    });

    React.useEffect(() => {
        if (transaction && formRef.current) {
            const dateStr = transaction.date?.split('T')[0] || '';
            formRef.current.description.value = transaction.description;
            formRef.current.type.value = transaction.type;
            formRef.current.amount.value = transaction.amount;
            formRef.current.date.value = dateStr;
        } else if (formRef.current) {
            formRef.current.reset();
            formRef.current.type.value = 'DEPENSE';
        }
    }, [transaction, visible]);

    if (!visible) return null;

    const validateForm = (values) => {
        const newErrors = {};
        
        if (!values.description.trim()) {
            newErrors.description = 'La description est requise';
        }
        
        if (!values.amount) {
            newErrors.amount = 'Le montant est requis';
        } else if (isNaN(Number(values.amount)) || Number(values.amount) < 0) {
            newErrors.amount = 'Le montant doit être un nombre positif';
        }
        
        if (!values.date) {
            newErrors.date = 'La date est requise';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const values = Object.fromEntries(formData);
  
      if (!validateForm(values)) return;
  
      setLoading(true);
      try {
          const formattedData = {
              description: values.description.trim(),
              type: values.type.toUpperCase(),
              amount: Number(values.amount),
              date: values.date
          };
  
          if (transaction?.id) {
              await transactionService.updateTransaction(transaction.id, formattedData);
              onSuccess('success', 'edit');
          } else {
              await transactionService.createTransaction(formattedData);
              onSuccess('success', 'create');
          }
      } catch (error) {
          console.error('Erreur:', error);
          onSuccess('error', transaction ? 'edit' : 'create');
          setErrors({ submit: error.response?.data?.message || 'Erreur lors de la sauvegarde' });
      } finally {
          setLoading(false);
      }
  };


    return (
        <>
            <SuccessModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
                type={modalState.type}
                mode={modalState.mode}
            />

            <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {transaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
                        </h2>
                        <button
                            onClick={onCancel}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Entrez une description"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                name="type"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="DEPENSE">Dépense</option>
                                <option value="REVENU">Revenu</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Montant
                            </label>
                            <input
                                type="number"
                                name="amount"
                                step="0.01"
                                min="0"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.amount ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="0.00"
                            />
                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                                    errors.date ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                            )}
                        </div>

                        {errors.submit && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={loading}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Chargement...' : transaction ? 'Modifier' : 'Ajouter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TransactionForm;