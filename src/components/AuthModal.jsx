import React from 'react';
import { Ticket, X } from 'lucide-react';

const AuthModal = ({ type, onClose, switchType }) => {
  const isLogin = type === 'login';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      {/* Click ra ngoài để đóng */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        {/* Header Modal */}
        <div className="flex items-center justify-center p-6 border-b relative">
          <button onClick={onClose} className="absolute right-4 top-6 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xl font-bold uppercase text-gray-800">
            <Ticket className="w-6 h-6 text-primary rotate-45" />
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Nhập email hoặc số điện thoại..." 
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-sm"
            />
            <input 
              type="password" 
              placeholder="Nhập mật khẩu..." 
              className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-sm"
            />
            
            {!isLogin && (
              <input 
                type="password" 
                placeholder="Xác nhận mật khẩu..." 
                className="w-full bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-sm"
              />
            )}

            <button type="button" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl mt-2 transition-colors shadow-lg shadow-primary/30">
              {isLogin ? 'Xác nhận' : 'Xác nhận đăng ký'}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-primary hover:underline font-medium">Quên mật khẩu?</a>
              <p className="text-sm text-gray-500 mt-2">
                Chưa có tài khoản? <button onClick={() => switchType('register')} className="text-primary font-bold hover:underline">Tạo tài khoản ngay</button>
              </p>
            </div>
          )}

          <div className="relative flex items-center justify-center my-8">
            <div className="absolute w-full border-t border-gray-200"></div>
            <span className="bg-white px-4 text-xs text-gray-400 relative z-10 italic">
              Hoặc {isLogin ? 'đăng nhập' : 'đăng ký'} bằng
            </span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors">
              <span className="text-blue-600 font-bold">f</span> <span className="text-sm text-gray-600">Facebook</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-colors">
              <span className="text-red-500 font-bold">G</span> <span className="text-sm text-gray-600">Google</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
            Bằng việc tiếp tục, bạn đã đọc và đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản sử dụng</a> & <a href="#" className="text-primary hover:underline">Chính sách bảo mật thông tin cá nhân</a> của ElonMerch
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;