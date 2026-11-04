import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
        Về trang chủ
      </Link>
    </div>
  );
};

