import React from 'react';
import { Ticket } from 'lucide-react';

const EventDetail = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-black uppercase text-gray-900 mt-8 mb-6">Mua Vé Ngay Tại ElonMerch</h1>
      
      <div className="flex flex-col md:flex-row gap-0 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white">
        {/* Cột ảnh bìa */}
        <div className="w-full md:w-[55%] bg-gray-900 relative">
          <div className="aspect-video w-full bg-gray-700">
            {/* Thẻ img ảnh bìa sự kiện sẽ đặt ở đây */}
          </div>
        </div>

        {/* Cột thông tin */}
        <div className="w-full md:w-[45%] p-8 flex flex-col justify-center bg-white/90">
          <div className="flex gap-3 mb-4">
            <Ticket className="w-8 h-8 text-primary rotate-45 flex-shrink-0" />
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Nhà Hát Kịch IDECAF: Lệ Chi Viên <br/>(Bí Mật Vườn Lệ Chi)</h2>
          </div>

          <div className="space-y-4 text-sm text-primary font-medium mt-2">
            <p>19:30 - 22:30, ngày 30 tháng 04, 2026</p>
            <div className="text-gray-600">
              <p className="text-primary italic">Sân Khấu Nhà Thiếu Nhi TP.HCM</p>
              <p className="font-normal text-xs mt-1">Số 04 Tú Xương, Phường Xuân Hòa, Thành phố Hồ Chí Minh</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95">
              Mua ngay
            </button>
            <div className="text-right">
              <span className="text-sm text-gray-500 font-medium">Giá từ </span>
              <span className="text-2xl font-black text-primary">300.000đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;