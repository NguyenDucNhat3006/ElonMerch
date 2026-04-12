import React, { useState } from 'react';
import { Search, ShoppingCart, User, Settings, LogOut, ClipboardList } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import myLogo from '../assets/banner/logoelon.png';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = ({ onOpenAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalItems = cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const tabs = [
    { name: 'Khám phá sự kiện', path: '/' },
    { name: 'Săn vé sự kiện', path: '/tickets' },
    { name: 'Mua sắm merch', path: '/merch' },
    { name: 'Creators', path: '/creators' },
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Giỏ hàng', path: '/cart', hidden: true }
  ];

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm font-sans">
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 relative z-30">
        <div className="max-w-[1440px] mx-auto px-10 md:px-16 flex items-center justify-between py-5">

          <Link to="/" className="flex items-center cursor-pointer h-16 md:h-20">
            <img src={myLogo} alt="Elon Merch Logo" className="h-full w-auto object-contain" />
          </Link>

          <div className="flex-1 max-w-2xl mx-12 relative hidden lg:block">
            <Search className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Tìm kiếm sự kiện, merchandise..."
              className="w-full bg-[#F0F3FF] rounded-full py-4 pl-16 pr-6 outline-none focus:ring-2 focus:ring-primary/50 text-lg transition-all"
            />
          </div>

          <div className="flex items-center gap-6 font-bold text-gray-900 text-xl">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors group flex items-center"
            >
              <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="h-8 w-[2px] bg-gray-200 mx-2"></div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 text-slate-600 hover:text-primary transition-all p-1 pr-4 rounded-full hover:bg-slate-50 border border-transparent hover:border-slate-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 overflow-hidden shadow-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <span className="font-bold text-sm hidden md:block max-w-[120px] truncate">{user.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden py-3 z-[100] animate-slide-up">
                    <div className="px-6 py-4 border-b border-slate-50 mb-2">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">Tài khoản của</p>
                      {/* Cập nhật tên trong menu dropdown */}
                      <p className="text-base font-black text-slate-900 truncate">{user.name}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('/order-details/ELON-9999'); 
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-6 py-3.5 text-sm text-slate-600 hover:bg-[#F0F3FF] hover:text-primary flex items-center gap-3 transition-colors font-bold"
                    >
                      <ClipboardList size={18} /> Đơn hàng của tôi
                    </button>

                    <button
                      onClick={() => {
                        navigate('/settings');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-6 py-3.5 text-sm text-slate-600 hover:bg-[#F0F3FF] hover:text-primary flex items-center gap-3 transition-colors font-bold"
                    >
                      <Settings size={18} /> Cài đặt tài khoản
                    </button>

                    <button
                      onClick={() => { logout(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-6 py-3.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors font-bold"
                    >
                      <LogOut size={18} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-6 items-center">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-lg hover:text-primary transition-all active:scale-95 font-bold"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="bg-primary text-white px-8 py-2.5 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 font-bold"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-primary shadow-xl relative z-20">
        <div className="max-w-[1440px] mx-auto px-10 md:px-16 flex justify-center gap-8 md:gap-20 text-lg md:text-xl font-medium">
          {tabs.filter(tab => !tab.hidden).map(tab => (
            <Link
              key={tab.path} to={tab.path}
              className={`py-5 px-3 relative transition-all duration-300 group ${location.pathname === tab.path ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              <span className="tracking-wide">{tab.name}</span>
              {location.pathname === tab.path && (
                <div className="absolute bottom-0 left-0 w-full h-[5px] bg-white rounded-t-full shadow-[0_-4px_10px_rgba(255,255,255,0.3)] animate-fade-in" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;