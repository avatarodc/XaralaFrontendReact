import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

export const getColumns = (onEdit, onDelete) => [
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        className: 'text-gray-800 font-medium',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (type) => {
            const isRevenu = type === 'REVENU';
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    isRevenu 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                    {isRevenu ? 'Revenu' : 'Dépense'}
                </span>
            );
        }
    },
    {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount, record) => (
            <span className={`font-medium tabular-nums ${
                record.type === 'REVENU' ? 'text-green-600' : 'text-red-600'
            }`}>
                {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                }).format(amount)}
            </span>
        ),
        align: 'right',
        className: 'text-gray-800',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => (
            <span className="text-gray-600">
                {new Date(date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </span>
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(record)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <Edit2 size={16} className="mr-1" />
                    Modifier
                </button>
                <button
                    onClick={() => onDelete(record)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    <Trash2 size={16} className="mr-1" />
                    Supprimer
                </button>
            </div>
        ),
    },
];