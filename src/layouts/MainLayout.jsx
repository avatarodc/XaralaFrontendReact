import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <header className="bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800">Gestion de Budget</h1>
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto p-4">
        {children}
      </main>
      <footer className="bg-white mt-8">
        <div className="max-w-[1400px] mx-auto p-4 text-center text-gray-600">
          © 2024 Gestion de Budget
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;