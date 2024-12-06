import React from 'react';
import { Table, Button } from 'antd';
import { useTransactions } from '../../hooks/useTransactions';
import { getColumns } from './columns.jsx';
import TransactionForm from '../TransactionForm';

const TransactionList = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingTransaction, setEditingTransaction] = React.useState(null);
    const { transactions, balance, loading, fetchTransactions, deleteTransaction } = useTransactions();

    React.useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleEdit = (record) => {
        setEditingTransaction(record);
        setIsModalVisible(true);
    };

    const columns = getColumns(handleEdit, deleteTransaction);

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestion de Budget</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setEditingTransaction(null);
                        setIsModalVisible(true);
                    }}
                >
                    Nouvelle Transaction
                </Button>
            </div>

            <div className="mb-4 p-4 bg-white rounded shadow">
                <h2 className="text-xl mb-2">Solde Total</h2>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {balance.toFixed(2)} €
                </p>
            </div>

            <Table
                columns={columns}
                dataSource={transactions}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                className="bg-white rounded shadow"
            />

            <TransactionForm
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingTransaction(null);
                }}
                onSuccess={() => {
                    fetchTransactions();
                    setIsModalVisible(false);
                    setEditingTransaction(null);
                }}
                transaction={editingTransaction}
            />
        </div>
    );
};

export default TransactionList;