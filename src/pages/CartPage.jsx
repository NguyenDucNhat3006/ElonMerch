import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, Clock, CheckCircle2, MapPin, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Import ảnh sự kiện để làm nền
import leChiVien from '../assets/banner/lechivien.png';
import ban2 from '../assets/banner/ban2.png';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  // ✅ ĐÃ SỬA: Lấy cả user và addOrder bên trong component
  const { user, addOrder } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [timeLeft, setTimeLeft] = useState(900);
  const [orderId, setOrderId] = useState("");

  const firstTicket = useMemo(() => cartItems.find(item => item.type === 'ticket'), [cartItems]);

  const bgImage = useMemo(() => {
    if (!firstTicket) return '';
    if (firstTicket.name.includes('Lệ Chi Viên')) return leChiVien;
    if (firstTicket.name.includes('Soobin')) return ban2;
    return firstTicket.img;
  }, [firstTicket]);

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0), [cartItems]);
  const totalQuantity = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const hasMerch = cartItems.some(item => item.type === 'merch');
  const total = subtotal + (hasMerch ? 30000 : 0);

  useEffect(() => {
    if ((checkoutStep === 2 || checkoutStep === 3) && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [checkoutStep, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return { min: m.toString().padStart(2, '0'), sec: s.toString().padStart(2, '0') };
  };

  const handleCheckoutClick = () => {
    if (!user) {
      alert("Vui lòng Đăng nhập ở góc trên bên phải để tiếp tục thanh toán!");
    } else {
      setCheckoutStep(2);
    }
  };

  const handleFinalPayment = () => {
    const finalId = `ELONMERCH-${Math.floor(Math.random() * 10000)}`;
    setOrderId(finalId);
    setCheckoutStep(3);
  };

  // --- GIAO DIỆN 1: GIỎ HÀNG ---
  if (checkoutStep === 1) {
    return (
      <div className="py-10 max-w-[1200px] mx-auto animate-fade-in">
        <h1 className="text-4xl font-black text-slate-900 mb-10 uppercase tracking-tight flex items-center gap-4">
          <ShoppingCart className="text-primary" size={40} /> Giỏ hàng của bạn
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex items-center gap-6 relative">
                <div className={`rounded-2xl overflow-hidden flex-shrink-0 bg-slate-50 
                  ${item.type === 'ticket' ? 'w-36 h-20' : 'w-24 h-24'}`}>
                  <img src={item.img} alt={item.name} className={`w-full h-full ${item.type === 'ticket' ? 'object-cover' : 'object-contain p-2'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.name}</h3>
                  <p className="text-slate-400 text-sm font-medium">{item.variant}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-primary font-black text-xl">{(item.price * item.quantity).toLocaleString()}đ</p>
                    {item.quantity > 1 && <p className="text-slate-400 text-xs font-bold">({item.price.toLocaleString()}đ x {item.quantity})</p>}
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 rounded-xl px-3 py-1 border border-slate-100">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-slate-400 hover:text-primary transition-all active:scale-125"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-slate-400 hover:text-primary transition-all active:scale-125"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            ))}
            <button onClick={() => navigate('/merch')} className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-bold hover:border-primary hover:text-primary transition-all">+ Mua thêm Merchandise</button>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-[#0F172A] text-white rounded-[40px] p-8 sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-widest">Tổng đơn hàng</h2>
              <div className="space-y-4 mb-8 text-slate-300">
                <div className="flex justify-between"><span>Tạm tính ({totalQuantity} món)</span><span className="text-white font-bold">{subtotal.toLocaleString()}đ</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển</span><span className="text-white font-bold">{hasMerch ? '30.000đ' : 'Miễn phí'}</span></div>
                <div className="pt-6 border-t border-slate-700 flex justify-between items-end">
                  <span className="font-bold">TỔNG CỘNG</span>
                  <span className="text-3xl font-black text-primary">{total.toLocaleString()}đ</span>
                </div>
              </div>
              <button
                onClick={handleCheckoutClick}
                className="w-full py-5 bg-[#4054B2] hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                TIẾN HÀNH THANH TOÁN <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN 2: THANH TOÁN ---
  if (checkoutStep === 2) {
    const time = formatTime(timeLeft);
    return (
      <div className="bg-[#111] -mt-12 -mx-10 md:-mx-16 min-h-screen text-white font-sans relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-20 blur-3xl scale-110 pointer-events-none" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="bg-[#1a1a1a]/90 backdrop-blur-md p-6 border-b border-white/5 relative z-10 shadow-xl">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-black leading-tight">{firstTicket?.name || 'Thanh toán đơn hàng'}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-slate-400 font-medium italic">
                <span className="flex items-center gap-2 not-italic"><Clock size={16} className="text-white" /> 19:30 - 22:30, 30 Tháng 04, 2026</span>
                <span className="flex items-center gap-2 not-italic"><MapPin size={16} className="text-white" /> Sân Khấu Nhà Thiếu Nhi TP.HCM</span>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-inner">
              <span className="text-[10px] uppercase font-black text-slate-400 leading-tight w-20 text-right tracking-tighter">Hoàn tất đặt vé trong</span>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-[#F87171] rounded-xl flex items-center justify-center text-2xl font-black shadow-lg">{time.min}</div>
                <div className="text-2xl font-black self-center">:</div>
                <div className="w-12 h-12 bg-[#F87171] rounded-xl flex items-center justify-center text-2xl font-black shadow-lg">{time.sec}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto py-10 px-6 relative z-10">
          <h2 className="text-[#22C55E] text-2xl font-black uppercase mb-8 tracking-[0.2em]">THANH TOÁN</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#222]/80 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <h3 className="text-[#22C55E] font-bold text-sm mb-4 uppercase tracking-widest">Thông tin nhận vé</h3>
                <p className="text-slate-400 text-sm mb-2 font-medium">Vé điện tử sẽ được hiển thị trong mục <span className="text-white font-bold">"Vé của tôi"</span> của tài khoản</p>
                <p className="font-bold text-slate-200 text-lg">{user?.email}</p>
              </div>
              <div className="bg-[#222]/80 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                <h3 className="text-[#22C55E] font-bold text-sm mb-6 uppercase tracking-widest">Phương thức thanh toán</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 cursor-pointer group p-3 rounded-xl hover:bg-white/5 transition-all">
                    <input type="radio" name="payment" className="hidden peer" checked={paymentMethod === 'vietqr'} onChange={() => setPaymentMethod('vietqr')} />
                    <div className="w-6 h-6 rounded-full border-2 border-slate-600 peer-checked:border-[#22C55E] peer-checked:bg-[#22C55E] transition-all flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                    <img src="https://img.vietqr.io/image/MB-024521252-compact2.png" className="w-10 h-10 rounded-lg bg-white p-1.5 object-contain" alt="logo" />
                    <span className={`text-sm font-black ${paymentMethod === 'vietqr' ? 'text-white' : 'text-slate-400'}`}>VietQR</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[28px] p-8 text-black shadow-2xl relative">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                  <p className="font-black text-sm uppercase">Thông tin đặt vé</p>
                  <button onClick={() => setCheckoutStep(1)} className="text-[#4054B2] text-xs font-black">Chọn lại vé</button>
                </div>
                <div className="space-y-8 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map(t => (
                    <div key={t.id} className="flex justify-between items-start">
                      <div className="max-w-[180px]">
                        <p className="font-black text-[11px] uppercase text-slate-800">{t.name}</p>
                        <p className="font-black text-slate-800 text-xs">{(t.price * t.quantity).toLocaleString()}đ</p>
                        <span className="inline-block bg-[#4054B2] text-white px-3 py-1 rounded-md text-[10px] font-black mt-2">{t.variant}</span>
                      </div>
                      <span className="font-black text-slate-400 text-sm">0{t.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-[28px] p-8 text-black shadow-2xl">
                <h3 className="font-black text-xs uppercase text-slate-400 mb-6 tracking-widest">Thông tin đơn hàng</h3>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center mb-8">
                  <span className="font-black text-slate-900">Tổng tiền</span>
                  <span className="text-3xl font-black text-[#22C55E]">{total.toLocaleString()}đ</span>
                </div>
                <button onClick={handleFinalPayment} className="w-full py-5 bg-[#22C55E] hover:bg-green-600 text-white rounded-2xl font-black text-xl shadow-lg">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN 3: QUÉT QR ---
  if (checkoutStep === 3) {
    const qrUrl = `https://img.vietqr.io/image/MB-024521252-compact2.png?amount=${total}&addInfo=${orderId}&accountName=NGUYEN DUC NHAT`;

    const handleConfirmPayment = () => {
      const newOrderRecord = {
        id: orderId,
        date: new Date().toLocaleDateString('vi-VN'),
        status: "Chờ xác nhận",
        total: total,
        items: cartItems.map(item => ({
          ...item,
          code: item.type === 'ticket' ? `TKT-${Math.random().toString(36).toUpperCase().substring(2, 10)}` : null,
          tracking: item.type === 'merch' ? `ELON-SPX-${Math.floor(Math.random() * 1000000)}` : null
        }))
      };
      addOrder(newOrderRecord);
      clearCart();
      setCheckoutStep(4);
    };

    return (
      <div className="py-20 text-center animate-slide-up">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg mx-auto border border-blue-50">
          <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase">Quét mã VietQR</h2>
          <p className="text-slate-500 mb-8 text-sm font-bold">Mã đơn: {orderId}</p>
          <div className="w-64 h-64 mx-auto mb-8 p-4 border-2 border-dashed border-primary/30 rounded-[32px] overflow-hidden bg-slate-50">
            <img src={qrUrl} className="w-full h-full object-contain" alt="QR" />
          </div>
          <div className="bg-blue-50 text-primary p-4 rounded-2xl mb-8 flex items-center justify-center gap-2 font-black text-xl">
            <Clock size={24} /> <span>{formatTime(timeLeft).min}:{formatTime(timeLeft).sec}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setCheckoutStep(2)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold text-slate-500">Quay lại</button>
            <button onClick={handleConfirmPayment} className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-lg">Xác nhận đã chuyển</button>
          </div>
        </div>
      </div>
    );
  }

  // --- GIAO DIỆN 4: THÀNH CÔNG ---
  if (checkoutStep === 4) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <div className="bg-white p-16 rounded-[50px] shadow-2xl max-w-2xl mx-auto border border-blue-50">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={56} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Thanh toán hoàn tất!</h2>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium px-10">Mọi thông tin vé và mã vận đơn đã được gửi vào hòm thư <br /><span className="text-primary font-black">{user?.email}</span></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate(`/order-details/${orderId}`)} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all">XEM CHI TIẾT VÉ & ĐƠN HÀNG</button>
            <button onClick={() => navigate('/')} className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105">VỀ TRANG CHỦ</button>
          </div>
        </div>
      </div>
    );
  }
};

export default CartPage;