// src/App.jsx
import React from 'react';
import MainLayout from './layouts/MainLayout';
import TransactionList from './components/TransactionList/index.jsx';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';

function App() {
  return (
    <ConfigProvider locale={frFR}>
      <MainLayout>
        <TransactionList />
      </MainLayout>
    </ConfigProvider>
  );
}

export default App;