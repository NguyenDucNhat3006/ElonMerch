import React from 'react';
import { Search } from 'lucide-react'; 
// 1. Import Link để chuyển trang và useLocation để nhận biết đang ở trang nào
import { Link, useLocation } from 'react-router-dom';

import myLogo from '../assets/banner/logoelon.png';

const Header = ({ onOpenAuth }) => {
  // 2. Lấy thông tin đường dẫn hiện tại từ URL
  const location = useLocation();

  // 3. Cấu hình mảng tabs bao gồm Tên và Đường dẫn (Path) tương ứng
  const tabs = [
    { name: 'Khám phá sự kiện', path: '/' },
    { name: 'Săn vé sự kiện', path: '/tickets' },
    { name: 'Mua sắm merch', path: '/merch' },
    { name: 'Creators', path: '/creators' },
    { name: 'Về chúng tôi', path: '/about' }
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">
      {/* PHẦN 1: THANH TRẮNG */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-10 md:px-16 flex items-center justify-between py-5"> 
          
          {/* Logo - Bọc trong Link để bấm vào là về trang chủ */}
          <Link to="/" className="flex items-center cursor-pointer h-20">
            <img 
              src={myLogo} 
              alt="Elon Merch Logo" 
              className="h-full w-auto object-contain" 
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-12 relative">
            <Search className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#F0F3FF] rounded-full py-4 pl-16 pr-6 outline-none focus:ring-2 focus:ring-primary/50 text-lg"
            />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-10 font-bold text-gray-900 text-xl">
            <button onClick={() => onOpenAuth('login')} className="hover:text-primary transition-colors">Đăng nhập</button>
            <button onClick={() => onOpenAuth('register')} className="hover:text-primary transition-colors">Đăng ký</button>
          </div>
        </div>
      </div>

      {/* PHẦN 2: THANH XANH (MENU ĐA TRANG) */}
      <div className="w-full bg-primary shadow-lg">
        <div className="max-w-[1440px] mx-auto px-10 md:px-16 flex justify-center gap-12 md:gap-24 text-lg md:text-xl font-medium">
          {tabs.map(tab => (
            /* 4. Thay button bằng Link để chuyển trang thực sự */
            <Link
              key={tab.path}
              to={tab.path}
              className={`py-5 px-2 relative transition-all duration-300 ${
                /* Kiểm tra nếu URL hiện tại khớp với path thì làm sáng menu */
                location.pathname === tab.path ? 'text-white' : 'text-white/75 hover:text-white'
              }`}
            >
              <span className="tracking-wide">{tab.name}</span>
              
              {/* Hiệu ứng gạch chân khi Tab đang được chọn */}
              {location.pathname === tab.path && (
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white rounded-t-md animate-fade-in" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;