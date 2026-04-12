import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react'; // Thêm icon Camera
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  // State quản lý form, thêm trường avatar
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    avatar: '' // Thêm state lưu ảnh đại diện
  });

  // Cập nhật state khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || '' 
      });
    }
  }, [user]);

  // Hàm xử lý khi khách hàng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Dùng FileReader để tạo ảnh preview ngay lập tức
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // CHỐT CHẶN: Nếu chưa đăng nhập, đá khách về trang chủ
  if (!user) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-400">Vui lòng đăng nhập để xem trang này.</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-primary underline font-bold">Về trang chủ</button>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="py-10 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-wide">Cài đặt tài khoản</h1>
      
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100">
        <form onSubmit={handleSave} className="space-y-8">
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg bg-slate-50 flex items-center justify-center group overflow-hidden">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-slate-300" />
              )}
              
              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white mb-1" size={24} />
                <span className="text-white text-[10px] font-bold uppercase">Đổi ảnh</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase mt-4 tracking-widest">Ảnh đại diện</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Họ và tên</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full bg-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Email</label>
              <input 
                type="text" 
                value={user.email} 
                disabled 
                className="w-full bg-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-400 cursor-not-allowed" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Số điện thoại</label>
              <input 
                type="text" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                className="w-full bg-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Địa chỉ giao hàng mặc định</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})} 
              className="w-full bg-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            />
          </div>

          <button type="submit" className="w-full py-5 mt-4 bg-primary hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
            <Save size={20} /> LƯU THAY ĐỔI
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;