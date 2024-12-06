// src/components/TransactionList/columns.jsx
import React from 'react';
import { Button, Space } from 'antd';

export const getColumns = (onEdit, onDelete) => [
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (type) => {
            return (
                <span style={{ color: type === 'REVENU' ? 'green' : 'red' }}>
                    {type === 'REVENU' ? 'Revenu' : 'Dépense'}
                </span>
            );
        }
    },
    {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => `${amount.toFixed(2)} €`,
        align: 'right',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => new Date(date).toLocaleDateString('fr-FR')
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space>
                <Button 
                    type="primary"
                    onClick={() => onEdit(record)}
                >
                    Modifier
                </Button>
                <Button 
                    danger
                    onClick={() => onDelete(record.id)}
                >
                    Supprimer
                </Button>
            </Space>
        ),
    },
];