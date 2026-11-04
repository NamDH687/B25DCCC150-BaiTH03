import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-8">Đang tải chi tiết sản phẩm...</p>;
  if (error || !product) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || 'Không tìm thấy sản phẩm'}</p>
        <Link to="/" className="text-blue-500 underline">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div className="bg-white p-6 rounded border flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
      </div>
      <div>
        <span className="text-sm uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {product.category}
        </span>
        <h1 className="text-2xl font-bold mt-2 mb-4">{product.title}</h1>
        <p className="text-3xl font-bold text-red-500 mb-4">${product.price}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{product.description}</p>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors"
          >
            Thêm vào giỏ
          </button>
          <Link
            to="/"
            className="border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded transition-colors flex items-center"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

