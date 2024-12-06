import { api } from './api';

export const transactionService = {
    async getAllTransactions() {
        try {
            const response = await api.get('/transactions');
            return response.data;
        } catch (error) {
            console.error('Erreur getAllTransactions:', error);
            throw error;
        }
    },

    async createTransaction(transaction) {
        try {
            const formattedData = {
                description: transaction.description,
                type: transaction.type.toUpperCase(),
                amount: Number(transaction.amount),
                date: `${transaction.date}T00:00:00` // Ajout de l'heure pour LocalDateTime
            };

            console.log('Données envoyées au serveur:', formattedData);
            const response = await api.post('/transactions', formattedData);
            return response.data;
        } catch (error) {
            console.error('Erreur complète:', error);
            throw error;
        }
    },

    async updateTransaction(id, transaction) {
        try {
            const formattedData = {
                description: transaction.description,
                type: transaction.type.toUpperCase(),
                amount: Number(transaction.amount),
                date: `${transaction.date}T00:00:00`
            };
    
            console.log('Update - ID:', id);
            console.log('Update - Données:', formattedData);
    
            const response = await api.put(`/transactions/${id}`, formattedData);
            console.log('Update - Réponse:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur update:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },

    async deleteTransaction(id) {
        try {
            await api.delete(`/transactions/${id}`);
        } catch (error) {
            console.error('Erreur deleteTransaction:', error);
            throw error;
        }
    }
};