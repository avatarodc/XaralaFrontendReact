import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, transaction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative z-[1000] bg-white rounded-lg p-6 shadow-xl w-96 mx-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full animate-bounce">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Confirmer la suppression
          </h2>
          
          <p className="text-center text-gray-600">
            Êtes-vous sûr de vouloir supprimer cette transaction ? 
            <br />
            <span className="font-medium">
              "{transaction?.description}" ({new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              }).format(transaction?.amount)})
            </span>
          </p>
          
          <div className="flex space-x-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;