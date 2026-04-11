import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  // State quản lý form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Cập nhật state khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  // CHỐT CHẶN 1: Nếu chưa đăng nhập, đá khách về trang chủ hoặc hiện thông báo
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
    alert("Cập nhật thành công!");
  };

  return (
    <div className="py-10 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase">Cài đặt tài khoản</h1>
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Họ và tên</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Email</label>
              <input type="text" value={user.email} disabled className="w-full bg-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-400 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Số điện thoại</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 rounded-2xl py-4 px-6 font-bold text-slate-700" />
            </div>
          </div>
          <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black shadow-lg">LƯU THAY ĐỔI</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;