import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
// 1. Kéo Context vào
import { useCart } from '../context/CartContext';

const MerchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 2. Gọi hàm addToCart từ Context
  const { addToCart } = useCart();

  const product = {
    id: id,
    name: "Áo Thun Soobin 'All-Rounder' Official",
    price: 350000,
    description: "Chất liệu cotton 100% co giãn 4 chiều, in hình chất lượng cao theo chủ đề Concert All-Rounder.",
    colors: ['Đen', 'Trắng'],
    sizes: ['S', 'M', 'L', 'XL']
  };

  const [selectedColor, setSelectedColor] = useState('Đen');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);

  // 3. Hàm xử lý khi bấm Thêm vào giỏ
  const handleAddToCart = () => {
    addToCart({
      id: `merch-${product.id}-${selectedColor}-${selectedSize}`, // Tạo ID phân biệt màu/size
      type: 'merch',
      name: product.name,
      variant: `Màu: ${selectedColor} | Size: ${selectedSize}`,
      price: product.price,
      quantity: quantity,
      img: 'https://picsum.photos/seed/merch/800/800'
    });
    navigate('/cart'); // Thêm xong bay thẳng ra giỏ hàng
  };

  return (
    <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="aspect-square bg-slate-100 rounded-[50px] overflow-hidden shadow-inner">
        <img src="https://picsum.photos/seed/merch/800/800" alt="Product" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-primary font-black uppercase tracking-widest text-sm mb-4">Official Merchandise</span>
        <h1 className="text-4xl font-black text-slate-900 mb-6">{product.name}</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-black text-primary">{product.price.toLocaleString()}đ</span>
          <div className="h-6 w-px bg-slate-200"></div>
          <div className="flex items-center text-yellow-500 gap-1 font-bold">
            <Star size={18} fill="currentColor" /> 4.9 (120 đánh giá)
          </div>
        </div>

        <p className="text-slate-500 text-lg leading-relaxed mb-10">{product.description}</p>

        <div className="mb-8">
          <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Màu sắc</p>
          <div className="flex gap-4">
            {product.colors.map(color => (
              <button 
                key={color} onClick={() => setSelectedColor(color)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all ${selectedColor === color ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Kích thước</p>
          <div className="flex gap-4">
            {product.sizes.map(size => (
              <button 
                key={size} onClick={() => setSelectedSize(size)}
                className={`w-14 h-14 rounded-2xl font-black transition-all flex items-center justify-center ${selectedSize === size ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-primary/30'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="w-full py-5 rounded-3xl font-black bg-slate-900 text-white hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl"
          >
            <ShoppingCart size={24} /> THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchDetailPage;