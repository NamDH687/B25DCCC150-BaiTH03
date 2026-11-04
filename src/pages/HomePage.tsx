import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filteredItems = items.filter((item: Product) => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" placeholder="Tìm kiếm sản phẩm..." 
        className="w-full p-2 mb-6 border rounded text-black bg-white"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
      />
      
      {status === 'loading' && <p className="text-center py-4">Đang tải dữ liệu...</p>}
      {status === 'failed' && <p className="text-center py-4 text-red-500">Lỗi: {error}</p>}
      
      {/* Lưới responsive: 1 cột mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
