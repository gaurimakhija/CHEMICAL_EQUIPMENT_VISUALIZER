import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  const showLogoutButton = location.pathname !== '/' && localStorage.getItem('access_token');

  return (
    <header className="bg-teal-600 shadow-md w-full">
      <div className="container mx-auto p-6 flex justify-between items-center">
        <h1 className="text-5xl font-bold text-#2F4F4F font-egregio script">Chemical Equipment Visualizer</h1>
        {showLogoutButton && (
        <button
          
         onClick={handleLogout}
         className="bg-red-500 hover:bg-yellow-600 text-grey font-semibold py-2.5 px-7 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 border border-red-400">
      Logout
</button>
        )}
      </div>
    </header>
  );
};

export default Header;