import { useState, useCallback } from 'react';
import { message } from 'antd';
import { transactionService } from '../services/transactionService';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await transactionService.getAllTransactions();
            setTransactions(data.transactions);
            setBalance(data.balance);
        } catch (error) {
            message.error('Erreur lors du chargement des transactions');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTransaction = useCallback(async (id) => {
        try {
            await transactionService.deleteTransaction(id);
            message.success('Transaction supprimée');
            await fetchTransactions();
        } catch (error) {
            message.error('Erreur lors de la suppression');
        }
    }, [fetchTransactions]);

    return {
        transactions,
        balance,
        loading,
        fetchTransactions,
        deleteTransaction
    };
};