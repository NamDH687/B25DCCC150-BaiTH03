import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg flex flex-col justify-between">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-48 w-full object-contain mb-4 bg-white p-2" />
        <h2 className="font-bold text-lg line-clamp-2">{product.title}</h2>
        <p className="text-red-500 font-semibold my-2">${product.price}</p>
      </Link>
      <button 
        onClick={() => dispatch(addToCart(product))}
        className="bg-blue-500 text-white py-2 rounded mt-2 w-full hover:bg-blue-600 transition-colors">
        Thêm vào giỏ
      </button>
    </div>
  );
};