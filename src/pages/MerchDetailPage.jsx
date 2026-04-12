import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ShoppingCart, Star, ArrowLeft, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import aosoobin from '../assets/products/aosoobin.jpg';
import imgSize from '../assets/products/size.jpg'; 
import khanbandana from '../assets/products/khanbandana.jpg';
import lightstick from '../assets/products/lightstick.jpg';
import totebag from '../assets/products/totebag.jpg';
import non from '../assets/products/non.jpg';

const mockProducts = [
  { 
    id: 1, 
    name: "Áo Thun Soobin 'All-Rounder' Official", 
    price: 350000, 
    img: aosoobin,
    sizeChart: imgSize, 
    rating: 4.9,
    reviews: 120,
    description: "Chất liệu cotton 100% co giãn 4 chiều, in hình chất lượng cao theo chủ đề Concert All-Rounder.",
    colors: ['Mặc định'], // Đã sửa lại thành 1 màu duy nhất
    sizes: ['S', 'M', 'L', 'XL']
  },
  { 
    id: 2, 
    name: "Lightstick Concert Phiên Bản Giới Hạn", 
    price: 850000, 
    img: lightstick, 
    rating: 5.0,
    reviews: 345,
    description: "Lightstick chính thức phiên bản giới hạn. Tích hợp công nghệ Bluetooth tự động đổi màu.",
    colors: ['Phiên bản Chuẩn'],
    sizes: ['Free Size']
  },
  { 
    id: 3, 
    name: "Khăn Bandana - phụ kiện “đa-zi-năng”", 
    price: 200000, 
    img: khanbandana, 
    rating: 4.8,
    reviews: 89,
    description: "Khăn Bandana thời trang cá tính, chất vải lụa nhân tạo mềm mịn.",
    colors: ['Mặc định'],
    sizes: ['Free Size']
  },
  { 
    id: 4, 
    name: "Tote Bag Vải Canvas Dày Dặn", 
    price: 150000, 
    img: totebag, 
    rating: 4.7,
    reviews: 210,
    description: "Túi Tote vải Canvas siêu bền bỉ, đường may chắc chắn.",
    colors: ['Mặc định'],
    sizes: ['Free Size']
  },
  { 
    id: 5, 
    name: "Mũ Cap - phụ kiện thời trang",
    price: 150000, 
    img: non, 
    rating: 4.7,
    reviews: 180,
    description: "Mũ Cap thời trang, chất liệu vải cotton mềm mại.",
    colors: ['Mặc định'],
    sizes: ['Free Size']
  }
];

const MerchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = mockProducts.find(p => p.id.toString() === id) || mockProducts[0];

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setShowSizeChart(false);
    }
  }, [id, product]);

  if (!product) return <div className="py-20 text-center font-bold">Đang tải sản phẩm...</div>;

  const handleAddToCart = () => {
    addToCart({
      id: `merch-${product.id}-${selectedColor}-${selectedSize}`, 
      type: 'merch',
      name: product.name,
      variant: `Size: ${selectedSize}`, // Chỉ hiển thị Size trong giỏ hàng cho gọn
      price: product.price,
      quantity: 1,
      img: product.img 
    });
    navigate('/cart'); 
  };

  return (
    <div className="py-10 animate-fade-in max-w-[1200px] mx-auto px-4">
      <button onClick={() => navigate('/merch')} className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold mb-8 transition-all active:scale-95">
        <ArrowLeft size={20} /> Quay lại cửa hàng
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="aspect-square bg-white rounded-[50px] overflow-hidden shadow-sm border border-slate-100 flex items-center justify-center p-6">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-3xl transition-all duration-500" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-black text-primary">{product.price.toLocaleString()}đ</span>
            <div className="flex items-center text-yellow-500 gap-1 font-bold bg-yellow-50 px-3 py-1 rounded-full text-sm">
              <Star size={16} fill="currentColor" /> {product.rating}
            </div>
          </div>

          <p className="text-slate-500 text-base mb-10">{product.description}</p>

          <div className="mb-8">
            <p className="font-bold text-slate-900 mb-4 uppercase text-[10px] tracking-widest">Màu sắc</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button 
                  key={color} onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${selectedColor === color ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-widest">Kích thước</p>
              {product.sizeChart && (
                <button onClick={() => setShowSizeChart(!showSizeChart)} className="flex items-center gap-1 text-primary text-[11px] font-black hover:underline">
                  <Ruler size={14} /> {showSizeChart ? 'Ẩn bảng size' : 'Hướng dẫn chọn size'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button 
                  key={size} onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl font-black transition-all active:scale-95 flex items-center justify-center ${selectedSize === size ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border-2 border-slate-100 text-slate-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {product.sizeChart && showSizeChart && (
              <div className="mt-4 rounded-2xl overflow-hidden border-2 border-dashed border-primary/20 animate-slide-up">
                <img src={product.sizeChart} alt="Size Chart" className="w-full h-auto" />
              </div>
            )}
          </div>

          <button onClick={handleAddToCart} className="w-full py-5 rounded-2xl font-black bg-slate-900 text-white hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
            <ShoppingCart size={22} /> THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MerchDetailPage;