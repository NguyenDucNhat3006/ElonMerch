import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ type, onClose, switchType }) => {
  const { login, register } = useAuth(); // Lấy hàm từ Context ra xài
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      login(email); // Gọi hàm đăng nhập giả lập
    } else {
      register(email);
    }
    onClose(); // Đăng nhập xong thì đóng Modal lại
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      {/* Khung Modal bám sát UI ảnh chụp */}
      <div className="bg-white rounded-3xl w-full max-w-[480px] shadow-2xl relative overflow-hidden animate-slide-up">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex-1 flex justify-center items-center gap-2 text-primary font-black text-xl">
           {type === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
          </div>
          <button onClick={onClose} className="absolute right-6 text-slate-400 hover:text-slate-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              required type="text" placeholder="Nhập email hoặc số điện thoại..." 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all text-sm"
            />
            <input 
              required type="password" placeholder="Nhập mật khẩu..." 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all text-sm"
            />
            {type === 'register' && (
              <input 
                required type="password" placeholder="Xác nhận mật khẩu..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all text-sm"
              />
            )}

            <button type="submit" className="w-full bg-[#4054B2] text-white rounded-xl py-4 font-bold hover:bg-blue-700 transition-all shadow-md mt-2">
              {type === 'login' ? 'Xác nhận' : 'Xác nhận đăng ký'}
            </button>
          </form>

          {type === 'login' ? (
            <div className="text-center mt-4 text-sm text-slate-500">
              <button className="text-[#4054B2] font-medium hover:underline block w-full mb-2">Quên mật khẩu?</button>
              Chưa có tài khoản? <button onClick={() => switchType('register')} className="text-[#4054B2] font-bold hover:underline">Tạo tài khoản ngay</button>
            </div>
          ) : (
            <div className="text-center mt-4 text-sm text-slate-500">
              Đã có tài khoản? <button onClick={() => switchType('login')} className="text-[#4054B2] font-bold hover:underline">Đăng nhập ngay</button>
            </div>
          )}

          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs text-slate-400 font-medium uppercase">Hoặc {type === 'login' ? 'đăng nhập' : 'đăng ký'} bằng</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 font-medium text-sm hover:bg-slate-50 transition-colors">
              <span className="text-blue-600 font-bold">f</span> Facebook
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3 font-medium text-sm hover:bg-slate-50 transition-colors">
              <span className="text-red-500 font-bold">G</span> Google
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-8 leading-relaxed px-4">
            Bằng việc tiếp tục, bạn đã đọc và đồng ý với <span className="text-[#4054B2]">Điều khoản sử dụng</span> & <span className="text-[#4054B2]">Chính sách bảo mật thông tin cá nhân</span> của ElonMerch
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;