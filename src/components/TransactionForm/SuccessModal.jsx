import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, type, mode }) => {
  const isEdit = mode === 'edit';
  const isDelete = mode === 'delete';
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-[1000] bg-white rounded-lg p-6 shadow-xl w-96 mx-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {type === 'success' ? (
            <div className="animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
          ) : (
            <div className="animate-bounce">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
          )}
          
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {type === 'success' ? (
              isDelete ? "Suppression réussie !" :
              isEdit ? "Modification réussie !" : 
              "Transaction ajoutée !"
            ) : (
              "Une erreur est survenue"
            )}
          </h2>
          
          <p className="text-center text-gray-600">
            {type === 'success' ? (
              isDelete ? "La transaction a été supprimée avec succès." :
              isEdit ? "La transaction a été modifiée avec succès." : 
              "La nouvelle transaction a été enregistrée avec succès."
            ) : (
              "Impossible de compléter l'opération. Veuillez réessayer."
            )}
          </p>
          
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full animate-shrink"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles à ajouter dans votre fichier global.css ou index.css
const styles = `
@keyframes shrink {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

.animate-shrink {
  animation: shrink 2s linear forwards;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default SuccessModal;