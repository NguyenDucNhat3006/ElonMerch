import React from 'react';
import leChiVien from '../assets/banner/lechivien.png';
import ban2 from '../assets/banner/ban2.png';


import { Calendar, MapPin, Ticket } from 'lucide-react';

const TicketPage = () => {
  const categories = ['Tất cả', 'Concert', 'Kịch nói', 'Workshop', 'Âm nhạc'];
  const tickets = [
    { id: 1, title: 'Lệ Chi Viên - Suất diễn đặc biệt', date: '20/04/2026', location: 'Nhà hát Bến Thành', price: '350.000đ', img: leChiVien },
    { id: 2, title: 'Soobin Live Concert - All Rounder', date: '05/05/2026', location: 'Global City, TP.HCM', price: '800.000đ', img: ban2 },
    { id: 3, title: 'Workshop: Làm nến thơm cùng Elon', date: '25/04/2026', location: 'Elon Merch Studio', price: '200.000đ', img: 'https://picsum.photos/seed/ws/400/250' },
    // Cậu thêm dữ liệu thật của Elon Merch vào đây nhé
  ];

  return (
    <div className="py-6">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Săn vé sự kiện</h1>
      
      {/* Bộ lọc danh mục */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map(cat => (
          <button key={cat} className="px-8 py-3 rounded-full bg-white border border-blue-100 font-bold hover:bg-primary hover:text-white transition-all shadow-sm whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      {/* Grid danh sách vé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tickets.map(t => (
          <div key={t.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-blue-50">
            <div className="aspect-video relative overflow-hidden">
              <img src={t.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-primary text-sm shadow-sm">
                {t.price}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black mb-4 line-clamp-1 group-hover:text-primary transition-colors">{t.title}</h3>
              <div className="space-y-3 mb-8 text-slate-500 font-medium">
                <div className="flex items-center gap-2"><Calendar size={18} /> {t.date}</div>
                <div className="flex items-center gap-2"><MapPin size={18} /> {t.location}</div>
              </div>
              <button className="w-full bg-[#F0F3FF] text-primary py-4 rounded-2xl font-black hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                MUA VÉ NGAY <Ticket size={20} className="group-hover/btn:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketPage;