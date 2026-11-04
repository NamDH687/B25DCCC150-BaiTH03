import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">ShopMini</Link>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
          {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
        </button>
        <Link to="/cart" className="font-semibold hover:underline">🛒 Giỏ hàng ({totalQuantity})</Link>
        {user ? (
          <div className="flex gap-3 items-center">
            <span>Chào, {user.username}</span>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors">
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded transition-colors">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};
