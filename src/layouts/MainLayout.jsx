import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">GB</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Gestion de Budget
            </h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-[1400px] mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {children}
        </div>
      </main>
      
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-[1400px] mx-auto p-4 text-center">
          <p className="text-gray-600 font-medium">
            © {new Date().getFullYear()} Gestion de Budget
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;