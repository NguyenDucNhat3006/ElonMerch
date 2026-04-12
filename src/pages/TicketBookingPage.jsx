import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

import iconTicket from '../assets/banner/logoticket.png';
import leChiVien from '../assets/banner/lechivien.png';
import bannerThuocDang from '../assets/banner/thuocdangdatat.png';
import concert from '../assets/banner/concert.png';
import hoathinh from '../assets/banner/hoathinh.png';
// IMPORT THÊM CÁC ẢNH SỰ KIỆN MỚI
import event1 from '../assets/event/eve1.png';
import event2 from '../assets/event/eve2.png';
import event3 from '../assets/event/eve3.png';

// ĐỒNG BỘ CHÍNH XÁC ID CỦA TỪNG SỰ KIỆN
const mockEvents = {
  "1": { id: "1", title: 'Nhà Hát Kịch IDECAF: Lệ Chi Viên', date: '19:30 - 22:30, 30 Tháng 04, 2026', location: 'Sân Khấu Nhà Thiếu Nhi TP.HCM', vipPrice: 350000, regPrice: 300000, img: leChiVien },
  "2": { id: "2", title: 'Soobin Live Concert - All Rounder', date: '19:00 - 23:30, 15 Tháng 05, 2026', location: 'The Global City, TP. Thủ Đức', vipPrice: 1500000, regPrice: 800000, img: concert },
  "3": { id: "3", title: 'Workshop: Làm nến thơm cùng Elon', date: '09:00 - 11:30, 25 Tháng 04, 2026', location: 'Elon Merch Studio, Quận 1', vipPrice: 500000, regPrice: 200000, img: 'https://picsum.photos/seed/ws/400/250' },
  "4": { id: "4", title: 'Kịch IDECAF: Thuốc Đắng Dã Tật', date: '20:00 - 23:00, 05 Tháng 05, 2026', location: 'Nhà Hát Bến Thành', vipPrice: 400000, regPrice: 250000, img: bannerThuocDang },
  "5": { id: "5", title: 'Lễ Hội Hoạt Hình 3D Toàn Cầu', date: '09:00 - 21:00, 01 Tháng 06, 2026', location: 'Trung tâm Triển lãm SECC', vipPrice: 250000, regPrice: 150000, img: hoathinh },
  // THÊM MỚI 3 SỰ KIỆN Ở TRANG CHỦ
  "6": { id: "6", title: 'Sân Khấu Quốc Thảo: Dưới Màn Son', date: '19:30 - 22:30, 10 Tháng 05, 2026', location: 'Sân Khấu Quốc Thảo', vipPrice: 300000, regPrice: 200000, img: event1 },
  "7": { id: "7", title: 'Hoàng Dũng - Xoay Tròn', date: '19:00 - 22:00, 20 Tháng 05, 2026', location: 'Nhà thi đấu Nguyễn Du', vipPrice: 1000000, regPrice: 500000, img: event2 },
  "8": { id: "8", title: 'Super Sunday Studio', date: '18:00 - 23:30, 05 Tháng 04, 2026', location: 'Tòa nhà CBD Premium Home', vipPrice: 250000, regPrice: 150000, img: event3 }
};

const TicketBookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const currentEvent = mockEvents[id] || mockEvents["1"];

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const [bookedSeats] = useState(['2B', '2C', '2D', '2E', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I']);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId, price) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.find(s => s.id === seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, { id: seatId, price }]);
    }
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats]);

  const handleAddAndGo = () => {
    selectedSeats.forEach(seat => {
      addToCart({
        id: `ticket-${id}-${seat.id}`,
        type: 'ticket',
        name: currentEvent.title,
        variant: `Ghế: ${seat.id}`,
        price: seat.price,
        quantity: 1,
        img: currentEvent.img || iconTicket, 
        date: currentEvent.date,
        location: currentEvent.location
      });
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] -mt-12 -mx-10 md:-mx-16 flex flex-col lg:flex-row font-sans">
      <div className="flex-1 p-8 md:p-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#4054B2] font-bold mb-6 hover:underline transition-all">
          <ArrowLeft size={20} /> Quay lại trang thông tin
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-sm p-10 border border-blue-50">
          <div className="flex justify-center gap-12 mb-16">
            <div className="flex items-center gap-3 text-slate-500 font-bold">
              <img src={iconTicket} className="w-8 h-8 object-contain" alt="Empty" /> Vé trống
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-bold">
              <img src={iconTicket} className="w-8 h-8 object-contain hue-rotate-[140deg] saturate-[3] brightness-110" alt="Selecting" /> Đang chọn
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-bold">
              <img src={iconTicket} className="w-8 h-8 object-contain hue-rotate-[220deg] saturate-[5] brightness-90" alt="Booked" /> Đã chọn
            </div>
          </div>

          <div className="w-3/4 mx-auto mb-12">
            <div className="bg-[#7F89C5] text-white text-center py-3 rounded-xl font-black tracking-[0.2em] shadow-lg">SÂN KHẤU</div>
          </div>

          <div className="space-y-4">
            {rows.map(row => (
              <React.Fragment key={row}>
                <div className="flex items-center justify-center gap-4">
                  <span className="w-6 font-black text-[#4054B2] text-center">{row}</span>
                  <div className="flex items-center gap-2 md:gap-4">
                    {cols.map((col) => {
                      const seatId = `${row}${col}`;
                      const isBooked = bookedSeats.includes(seatId);
                      const isSelected = selectedSeats.find(s => s.id === seatId);
                      const price = row <= 3 ? currentEvent.vipPrice : currentEvent.regPrice;

                      return (
                        <React.Fragment key={seatId}>
                          {col === 'G' && <div className="w-4 md:w-8" />}
                          <button
                            onClick={() => handleSeatClick(seatId, price)}
                            className={`transition-all duration-300 transform ${isBooked ? 'cursor-not-allowed' : 'hover:scale-125'}`}
                          >
                            <img
                              src={iconTicket}
                              alt={seatId}
                              className={`w-8 h-8 md:w-9 md:h-9 object-contain transition-all
                                ${isBooked ? 'hue-rotate-[220deg] saturate-[5] brightness-90 opacity-80' : ''} 
                                ${isSelected ? 'hue-rotate-[140deg] saturate-[3] brightness-110 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : ''}
                              `}
                            />
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                
                {/* ĐƯỜNG KẺ RANH GIỚI TINH TẾ */}
                {row === 3 && (
                  <div className="w-[85%] mx-auto my-6 border-t border-slate-300"></div>
                )}
              </React.Fragment>
            ))}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="w-6" />
              <div className="flex items-center gap-2 md:gap-4">
                {cols.map(col => (
                  <React.Fragment key={col}>
                    {col === 'G' && <div className="w-4 md:w-8" />}
                    <span className="w-[32px] md:w-[36px] text-center font-black text-[#4054B2] text-xs">{col}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] bg-[#7F89C5] text-white flex flex-col relative">
        <div className="p-8 space-y-8 flex-1">
          <div className="pb-6 border-b border-white/20">
            <h2 className="text-xl font-black leading-tight mb-6">{currentEvent.title}</h2>
            <div className="space-y-4 text-sm font-medium opacity-90">
              <div className="flex items-center gap-3"><Calendar size={18} /> {currentEvent.date}</div>
              <div className="flex items-center gap-3"><MapPin size={18} /> {currentEvent.location}</div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-widest text-right">Giá vé</h3>
            <div className="flex justify-between items-start">
              <div><p className="font-black text-sm uppercase">HẠNG VIP</p><p className="text-[10px] opacity-70 italic font-bold">Hàng 1 2 3</p></div>
              <p className="font-black text-lg">{currentEvent.vipPrice.toLocaleString()} VNĐ</p>
            </div>
            <div className="flex justify-between items-start">
              <div><p className="font-black text-sm uppercase">HẠNG REGULAR</p><p className="text-[10px] opacity-70 italic font-bold">Hàng 4 5 6 7 8</p></div>
              <p className="font-black text-lg">{currentEvent.regPrice.toLocaleString()} VNĐ</p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-8 border-t border-white/20">
          <div className="flex justify-between items-center mb-6">
            <span className="font-black text-lg uppercase max-w-[150px] truncate">
              {selectedSeats.length > 0 ? `${selectedSeats.map(s => s.id).join(', ')}` : '--'}
            </span>
            <span className="font-black text-xl">{totalPrice.toLocaleString()} VNĐ</span>
          </div>
          <button
            disabled={selectedSeats.length === 0}
            onClick={handleAddAndGo}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl
              ${selectedSeats.length > 0 ? 'bg-[#4054B2] text-white hover:bg-blue-800 hover:scale-[1.02] active:scale-95' : 'bg-white/20 text-white/40 cursor-not-allowed'}
            `}
          >
            Tiếp tục - {totalPrice.toLocaleString()} VNĐ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingPage;