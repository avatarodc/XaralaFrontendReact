import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { transactionService } from '../../services/transactionService';
import moment from 'moment';

const { Option } = Select;

const TransactionForm = ({ visible, onCancel, onSuccess, transaction }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (transaction) {
            console.log('Transaction à modifier:', transaction);
            const formValues = {
                description: transaction.description,
                type: transaction.type,
                amount: transaction.amount,
                date: transaction.date ? moment(transaction.date.split('T')[0]) : null
            };
            console.log('Valeurs du formulaire:', formValues);
            form.setFieldsValue(formValues);
        } else {
            form.resetFields();
        }
    }, [transaction, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const formattedData = {
                description: values.description.trim(),
                type: values.type.toUpperCase(),
                amount: Number(values.amount),
                date: values.date.format('YYYY-MM-DD')
            };

            console.log('Valeurs du formulaire:', values);
            console.log('Données formatées:', formattedData);

            if (transaction?.id) {
                console.log('Mise à jour de la transaction:', transaction.id);
                await transactionService.updateTransaction(transaction.id, formattedData);
                message.success('Transaction modifiée avec succès');
            } else {
                console.log('Création d\'une nouvelle transaction');
                await transactionService.createTransaction(formattedData);
                message.success('Transaction créée avec succès');
            }

            onSuccess();
            onCancel();
        } catch (error) {
            console.error('Erreur détaillée:', {
                error,
                response: error.response?.data,
                status: error.response?.status
            });
            message.error(error.response?.data?.message || 'Erreur lors de la sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={transaction ? 'Modifier la transaction' : 'Nouvelle transaction'}
            open={visible}
            onCancel={onCancel}
            footer={null}
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ type: 'DEPENSE' }}
            >
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { required: true, message: 'La description est requise' },
                        { whitespace: true, message: 'La description ne peut pas être vide' }
                    ]}
                >
                    <Input placeholder="Entrez une description" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Le type est requis' }]}
                >
                    <Select>
                        <Option value="REVENU">Revenu</Option>
                        <Option value="DEPENSE">Dépense</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="Montant"
                    rules={[
                        {
                            required: true,
                            message: 'Le montant est requis'
                        },
                        {
                            validator: async (_, value) => {
                                if (value === '' || value === null || value === undefined) {
                                    return Promise.reject(new Error('Le montant est requis'));
                                }
                                const numValue = Number(value);
                                if (isNaN(numValue)) {
                                    return Promise.reject(new Error('Le montant doit être un nombre'));
                                }
                                if (numValue < 0) {
                                    return Promise.reject(new Error('Le montant doit être positif'));
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true, message: 'La date est requise' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Sélectionnez une date"
                    />
                </Form.Item>

                <Form.Item className="mb-0 text-right">
                    <Button 
                        type="default" 
                        onClick={onCancel} 
                        className="mr-2"
                        disabled={loading}
                    >
                        Annuler
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                    >
                        {transaction ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TransactionForm;