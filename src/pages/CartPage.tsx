import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeFromCart, updateQuantity, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice';
import type { CartItem } from '../types';

export const CartPage: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalMoney = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg mb-4">Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="text-blue-500 hover:underline font-semibold">
          ← Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <div className="flex gap-4 items-center">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-white p-1 rounded border" />
            <div>
              <Link to={`/products/${item.id}`} className="font-semibold hover:underline line-clamp-1">
                {item.title}
              </Link>
              <p className="text-red-500">${item.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="number" min="1" value={item.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (val > 0) {
                  dispatch(updateQuantity({ id: item.id, quantity: val }));
                }
              }}
              className="w-16 p-1 border rounded text-black bg-white"
            />
            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500 hover:text-red-700">
              Xoá
            </button>
          </div>
        </div>
      ))}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Tổng tiền: ${totalMoney.toFixed(2)}</h2>
        <Link to="/checkout" className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors">
          Tiến hành thanh toán
        </Link>
      </div>
    </div>
  );
};
