import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Package, CheckCircle2, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // CHỐT CHẶN 1: Bảo vệ user null
  if (!user) {
    return <div className="py-20 text-center font-bold text-slate-400">Vui lòng đăng nhập để xem đơn hàng.</div>;
  }

  // CHỐT CHẶN 2: Tìm đơn hàng an toàn
  const order = user.orders?.find(o => o.id === id) || user.orders?.[0];

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-400">Bạn chưa có đơn hàng nào.</h2>
        <button onClick={() => navigate('/tickets')} className="mt-4 text-primary underline font-bold">Đi mua vé ngay</button>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-5xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold mb-8">
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-slate-400 text-xs font-black uppercase">Chi tiết đơn hàng</p>
          <h1 className="text-4xl font-black text-slate-900">#{order.id}</h1>
        </div>
        <div className="bg-green-50 px-6 py-3 rounded-2xl text-green-600 font-bold flex items-center gap-2">
          <CheckCircle2 size={20} /> {order.status}
        </div>
      </div>

      <div className="space-y-6">
        {order.items?.map((item, index) => (
          <div key={index} className="bg-white rounded-[40px] p-8 border border-slate-100 flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex gap-6">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.img} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{item.name}</h3>
                <p className="text-slate-500 text-sm font-bold">{item.variant}</p>
              </div>
            </div>
            
            <div className="md:w-1/3 border-l border-dashed border-slate-100 md:pl-8 flex items-center">
              {item.type === 'ticket' ? (
                <div className="w-full text-center bg-slate-900 text-white p-4 rounded-2xl font-mono text-sm">
                  {item.code} <QrCode size={32} className="mx-auto mt-2 opacity-50" />
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-xs font-black text-slate-400 uppercase">Vận đơn</p>
                  <p className="font-bold text-primary">{item.tracking}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;