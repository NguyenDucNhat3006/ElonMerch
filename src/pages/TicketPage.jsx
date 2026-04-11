import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Info, Map } from 'lucide-react';

// Import ảnh thực tế từ dự án của Nhật
import leChiVien from '../assets/banner/lechivien.png';
import ban2 from '../assets/banner/ban2.png';

const TicketPage = () => {
  const navigate = useNavigate();

  // Dữ liệu sự kiện nổi bật (Lấy theo bản thiết kế mới của Nhật)
  const featuredEvent = {
    id: 1,
    title: 'Nhà Hát Kịch IDECAF: Lệ Chi Viên (Bí Mật Vườn Lệ Chi)',
    time: '19:30 - 22:30, ngày 30 tháng 04, 2026',
    location: 'Sân Khấu Nhà Thiếu Nhi TP.HCM',
    address: 'Số 04 Tú Xương, Phường Xuân Hòa, Thành phố Hồ Chí Minh',
    price: '300.000đ',
    img: leChiVien,
    description: `SÂN KHẤU SỬ VIỆT HỌC ĐƯỜNG\nLỆ CHI VIÊN - Bí Mật Vườn Lệ Chi\n\nTác giả: Hoàng Hữu Đản\nBiên tập và Đạo diễn: Quang Thảo\nDiễn viên: Quang Thảo, Thanh Thủy, Hoàng Trinh, Đại Nghĩa, Đình Toàn, Hồng Ánh, Mỹ Duyên, Trịnh Minh Dũng, Tâm Anh, Phi Nga, Kan Lê...`
  };

  // Danh sách sự kiện gợi ý bên dưới
  const otherEvents = [
    { id: 2, title: 'Soobin Live Concert - All Rounder', date: '05/05/2026', price: '800.000đ', img: ban2 },
    { id: 3, title: 'Workshop: Làm nến thơm cùng Elon', date: '25/04/2026', price: '200.000đ', img: 'https://picsum.photos/seed/ws/400/250' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* 1. SECTION: MUA VÉ NGAY TẠI ELONMERCH */}
      <section>
        <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase">Mua vé ngay tại Elonmerch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Banner sự kiện chính */}
          <div className="lg:col-span-7 rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
            <img src={featuredEvent.img} alt="Banner" className="w-full h-full object-cover" />
          </div>

          {/* Card thông tin đặt vé nhanh */}
          <div className="lg:col-span-5 bg-white/60 backdrop-blur-xl p-8 rounded-[40px] shadow-sm border border-blue-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <Ticket size={24} />
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">
                {featuredEvent.title}
              </h1>
            </div>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-3 text-primary font-bold">
                <Calendar size={20} className="mt-1" />
                <span>{featuredEvent.time}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-500 font-medium italic">
                <MapPin size={20} className="mt-1 text-primary" />
                <div>
                  <p className="font-bold text-primary not-italic">{featuredEvent.location}</p>
                  <p className="text-sm mt-1">{featuredEvent.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-slate-200 flex items-center justify-between">
              <button 
                onClick={() => navigate(`/book-ticket/${featuredEvent.id}`)}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
              >
                Mua ngay
              </button>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-bold">Giá từ</p>
                <p className="text-2xl font-black text-primary">{featuredEvent.price}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: GIỚI THIỆU & DÀNH CHO BẠN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Khối giới thiệu chi tiết */}
        <div className="lg:col-span-8 bg-white/40 backdrop-blur-md p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-blue-100">
            <Info className="text-primary" />
            <h3 className="text-2xl font-black text-primary uppercase">Giới thiệu</h3>
          </div>
          <div className="text-slate-700 leading-relaxed font-medium whitespace-pre-line">
            {featuredEvent.description}
          </div>
        </div>

        {/* Khối danh sách "Dành cho bạn" */}
        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-2xl font-black text-primary uppercase ml-4">Dành cho bạn</h3>
          <div className="space-y-6">
            {otherEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => navigate(`/book-ticket/${event.id}`)}
                className="group bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex gap-4"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={event.img} alt="thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-slate-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-primary font-black">{event.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;