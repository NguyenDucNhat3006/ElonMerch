import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Package, CheckCircle2, QrCode, Truck, X, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State quản lý việc mở Modal Tracking
  const [trackingItem, setTrackingItem] = useState(null);

  if (!user) {
    return <div className="py-20 text-center font-bold text-slate-400">Vui lòng đăng nhập để xem đơn hàng.</div>;
  }

  const order = user.orders?.find(o => o.id === id) || user.orders?.[0];

  if (!order) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-400">Bạn chưa có đơn hàng nào.</h2>
        <button onClick={() => navigate('/tickets')} className="mt-4 text-primary underline font-bold">Đi mua vé ngay</button>
      </div>
    );
  }

// Lấy thời gian thực tế ngay lúc cậu đang demo trên bục
  const now = new Date();
  const currentTime = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  // Dữ liệu mô phỏng tiến trình giao hàng: Trạng thái VỪA MỚI ĐẶT
  const trackingSteps = [
    { time: "Dự kiến: 2-3 ngày tới", status: "Giao hàng thành công", done: false },
    { time: "Dự kiến: Ngày mai", status: "Shipper sẽ giao hàng đến bạn", done: false },
    { time: "Đang chờ cập nhật", status: "Đến bưu cục phát (Thủ Đức)", done: false },
    { time: "Đang chờ lấy hàng", status: "Đơn vị vận chuyển lấy hàng", done: false },
    { time: `${currentTime} - Hôm nay`, status: "Người bán đang chuẩn bị hàng", done: true },
    { time: `${currentTime} - Hôm nay`, status: "Đơn hàng đã được xác nhận", done: true },
  ];

  return (
    <div className="py-10 max-w-5xl mx-auto animate-fade-in relative">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold mb-8">
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Chi tiết đơn hàng</p>
          <h1 className="text-4xl font-black text-slate-900">#{order.id}</h1>
        </div>
        <div className="bg-green-50 px-6 py-3 rounded-2xl text-green-600 font-bold flex items-center gap-2">
          <CheckCircle2 size={20} /> {order.status}
        </div>
      </div>

      <div className="space-y-6">
        {order.items?.map((item, index) => (
          <div key={index} className="bg-white rounded-[40px] p-8 border border-slate-100 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 flex gap-6">
              <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {item.type === 'ticket' ? 'E-Ticket' : 'Merchandise'}
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{item.name}</h3>
                <p className="text-slate-500 text-sm font-bold">{item.variant}</p>
              </div>
            </div>
            
            <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-dashed border-slate-200 pt-6 md:pt-0 md:pl-8 flex items-center">
              {item.type === 'ticket' ? (
                <div className="w-full text-center">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-sm tracking-wider mb-2 shadow-lg">
                    {item.code || 'TKT-ELON-888'}
                  </div>
                  <button className="flex items-center justify-center gap-2 w-full py-2 text-xs font-black text-slate-500 hover:text-primary transition-colors">
                    <QrCode size={16} /> XEM MÃ QR
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-xs font-black text-slate-400 uppercase mb-3">Mã vận đơn</p>
                  {/* NÚT BẤM XEM TIẾN TRÌNH GIAO HÀNG */}
                  <button 
                    onClick={() => setTrackingItem(item)}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-primary font-black rounded-2xl hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all w-full justify-center"
                  >
                    <Truck size={18} />
                    {item.tracking || 'ELON-SPX-999'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL HIỂN THỊ TIẾN TRÌNH GIAO HÀNG */}
      {trackingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Lớp nền đen mờ */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setTrackingItem(null)}
          ></div>
          
          {/* Box nội dung */}
          <div className="bg-white rounded-[40px] w-full max-w-md relative z-10 p-8 shadow-2xl animate-slide-up">
            <button 
              onClick={() => setTrackingItem(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <Package size={28} />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900">Tiến trình giao hàng</h3>
                <p className="text-sm font-bold text-slate-500 mt-1">
                  Mã: <span className="text-primary tracking-wider">{trackingItem.tracking || 'ELON-SPX-999'}</span>
                </p>
              </div>
            </div>

            {/* Trục thời gian (Timeline) */}
            <div className="relative border-l-2 border-slate-100 ml-6 space-y-8 pb-4">
              {trackingSteps.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Chấm tròn trạng thái */}
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white transition-all duration-300
                    ${step.done 
                      ? idx === 1 ? 'bg-primary shadow-[0_0_12px_rgba(64,84,178,0.6)] scale-125' : 'bg-primary' 
                      : 'bg-slate-200'}
                  `}></div>
                  
                  {/* Nội dung trạng thái */}
                  <p className={`font-black text-base ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.status}
                  </p>
                  <p className={`text-xs font-bold mt-1 ${step.done ? 'text-primary' : 'text-slate-400'}`}>
                    {step.time}
                  </p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setTrackingItem(null)}
              className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black active:scale-95 transition-all shadow-xl"
            >
              ĐÓNG
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderDetailsPage;