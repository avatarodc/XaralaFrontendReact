import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { getColumns } from './columns.jsx';
import TransactionForm from '../TransactionForm';
import SuccessModal from '../TransactionForm/SuccessModal';
import DeleteConfirmationModal from '../TransactionForm/DeleteConfirmationModal';

const TransactionList = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingTransaction, setEditingTransaction] = React.useState(null);
    const { transactions, balance, loading, fetchTransactions, deleteTransaction } = useTransactions();
    const [successModal, setSuccessModal] = React.useState({
        isOpen: false,
        type: 'success',
        mode: 'create'
    });
    const [deleteModal, setDeleteModal] = React.useState({
        isOpen: false,
        transaction: null
    });

    React.useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    React.useEffect(() => {
        if (successModal.isOpen) {
            const timer = setTimeout(() => {
                setSuccessModal(prev => ({ ...prev, isOpen: false }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successModal.isOpen]);

    const handleEdit = (record) => {
        setEditingTransaction(record);
        setIsModalVisible(true);
    };

    const handleSuccess = (type, mode) => {
        fetchTransactions();
        setSuccessModal({ isOpen: true, type, mode });
        setIsModalVisible(false);
        setEditingTransaction(null);
    };

    const handleDeleteClick = (transaction) => {
        setDeleteModal({
            isOpen: true,
            transaction: transaction
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteTransaction(deleteModal.transaction.id);
            setDeleteModal({ isOpen: false, transaction: null });
            setSuccessModal({
                isOpen: true,
                type: 'success',
                mode: 'delete'
            });
            fetchTransactions();
        } catch (error) {
            setDeleteModal({ isOpen: false, transaction: null });
            setSuccessModal({
                isOpen: true,
                type: 'error',
                mode: 'delete'
            });
        }
    };

    const columns = getColumns(handleEdit, handleDeleteClick);

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            {/* Message de succès/erreur */}
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={() => setSuccessModal(prev => ({ ...prev, isOpen: false }))}
                type={successModal.type}
                mode={successModal.mode}
            />

            {/* Modal de confirmation de suppression */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, transaction: null })}
                onConfirm={handleDeleteConfirm}
                transaction={deleteModal.transaction}
            />

            {/* Header Section */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Gestion de Budget
                </h1>
                <button
                    onClick={() => {
                        setEditingTransaction(null);
                        setIsModalVisible(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-sm"
                >
                    + Nouvelle Transaction
                </button>
            </div>

            {/* Balance Card */}
            <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-medium text-gray-700 mb-3">Solde Total</h2>
                <p className={`text-3xl font-bold tracking-tight ${
                    balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                    {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(balance)}
                </p>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map(column => (
                                    <th
                                        key={column.key}
                                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                            column.align === 'right' ? 'text-right' : ''
                                        }`}
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                                        Chargement...
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                                        Aucune transaction trouvée
                                    </td>
                                </tr>
                            ) : (
                                transactions.map(transaction => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        {columns.map(column => (
                                            <td
                                                key={column.key}
                                                className={`px-6 py-4 whitespace-nowrap ${
                                                    column.align === 'right' ? 'text-right' : ''
                                                }`}
                                            >
                                                {column.render
                                                    ? column.render(transaction[column.dataIndex], transaction)
                                                    : transaction[column.dataIndex]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transaction Form Modal */}
            <TransactionForm
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingTransaction(null);
                }}
                onSuccess={(type, mode) => handleSuccess(type, mode)}
                transaction={editingTransaction}
            />
        </div>
    );
};

export default TransactionList;