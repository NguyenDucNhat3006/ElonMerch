import React, { useState } from 'react';

const SeatSelection = () => {
  // Demo dữ liệu ghế (Thực tế sẽ fetch từ API)
  const [seats, setSeats] = useState([
    { id: 'A1', status: 'available', type: 'Standard' },
    { id: 'A2', status: 'booked', type: 'Standard' },
    { id: 'A3', status: 'available', type: 'VIP' },
    { id: 'B1', status: 'available', type: 'Standard' },
    // ... thêm nhiều ghế khác
  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;
    
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  return (
    <div className="bg-slate-900 p-10 rounded-[40px] text-white">
      <div className="text-center mb-10">
        <div className="w-3/4 h-2 bg-primary/30 mx-auto rounded-full mb-2 shadow-[0_0_20px_rgba(67,83,185,0.5)]"></div>
        <p className="text-slate-500 text-sm uppercase tracking-widest">Sân khấu / Màn hình</p>
      </div>

      {/* Grid ghế */}
      <div className="grid grid-cols-8 gap-4 justify-center max-w-md mx-auto">
        {seats.map(seat => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all
              ${seat.status === 'booked' ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 
                selectedSeats.includes(seat.id) ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/50' : 
                'bg-slate-700 hover:bg-slate-600 text-slate-300'}
            `}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {/* Thông tin đặt chỗ */}
      <div className="mt-12 p-6 bg-white/5 rounded-3xl flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">Ghế đã chọn:</p>
          <p className="text-xl font-black">{selectedSeats.join(', ') || 'Chưa chọn'}</p>
        </div>
        <button className="bg-primary px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
          TIẾP TỤC THANH TOÁN
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;