import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { clearCart } from '../features/cart/cartSlice';

export const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setIsOrdered(true);
  };

  if (isOrdered) return <div className="text-green-500 text-xl font-bold">🎉 Đặt hàng thành công! Giỏ hàng đã được làm trống.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
      <p className="mb-4">Xác nhận thông tin giao hàng và đơn hàng của bạn.</p>
      <button onClick={handleOrder} className="bg-green-600 text-white px-6 py-2 rounded">
        Đặt hàng
      </button>
    </div>
  );
};