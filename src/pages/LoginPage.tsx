import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError('Sai mật khẩu! (Mật khẩu đúng: 123456)');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text" placeholder="Tên đăng nhập" required
          className="border p-2 rounded text-black bg-white"
          value={username} onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password" placeholder="Mật khẩu (123456)" required
          className="border p-2 rounded text-black bg-white"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};
