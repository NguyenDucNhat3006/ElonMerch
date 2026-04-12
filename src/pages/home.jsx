import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';

// --- IMPORT SWIPER ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// --- IMPORT ASSETS ---
import bannerThuocDang from '../assets/banner/thuocdangdatat.png';
import concert from '../assets/banner/concert.png';
import hoathinh from '../assets/banner/hoathinh.png';
import leChiVien from '../assets/banner/lechivien.png';
import logoTicket from '../assets/banner/logoticket.png';
import event1 from '../assets/event/eve1.png';
import event2 from '../assets/event/eve2.png';
import event3 from '../assets/event/eve3.png';
import event4 from '../assets/event/eve4.png';
import event5 from '../assets/event/eve5.png';
import merchEv1 from '../assets/event/pven1.png';
import merchEv2 from '../assets/event/pven2.png';
import merchEv3 from '../assets/event/pven3.png';
import ban1 from '../assets/banner/ban1.png';
import ban2 from '../assets/banner/ban2.png';
import aosoobin from '../assets/products/aosoobin.jpg';
import khanbandana from '../assets/products/khanbandana.jpg';
import lightstick from '../assets/products/lightstick.jpg';
import non from '../assets/products/non.jpg';
import totebag from '../assets/products/totebag.jpg';

const Home = () => {
  const navigate = useNavigate();

  // ĐỒNG BỘ ID KHỚP VỚI CƠ SỞ DỮ LIỆU
  const topEvents = [
    { id: 1, title: 'Lệ Chi Viên', img: leChiVien },
    { id: 4, title: 'Thuốc Đắng Dã Tật', img: bannerThuocDang }, 
    { id: 2, title: 'Concert', img: concert }, 
    { id: 5, title: 'Hoạt hình', img: hoathinh }, 
  ];

  // ✅ ĐÃ CẬP NHẬT TÊN VÀ NHÃN TỪ ẢNH THIẾT KẾ CỦA NHẬT
  const specialEvents = [
    { id: 6, title: 'Sân Khấu Quốc Thảo: Dưới Màn Son', img: event1, label: 'Giảm 50%' },
    { id: 7, title: 'Hoàng Dũng - Xoay Tròn', img: event2, label: 'MERCHANDISE' },
    { id: 8, title: 'Super Sunday Studio', img: event3, label: 'TRỰC TIẾP' },
    { id: 1, title: 'Lệ Chi Viên', img: leChiVien, label: 'HOT' }, // Link về Lệ Chi Viên
    { id: 2, title: 'Soobin All-Rounder', img: concert, label: null }, // Link về Soobin
  ];

  const merchCollections = [
    { id: 1, title: 'Mr Siro Collection', img: ban1 },
    { id: 2, title: 'Soobin Collection', img: ban2 },
  ];

  const merchEvents = [
    { id: 3, title: 'Workshop Nến Thơm', img: merchEv1 }, 
    { id: 2, title: 'Soobin Live Concert', img: merchEv2 }, 
    { id: 1, title: 'Lệ Chi Viên Merch', img: merchEv3, label: 'MERCHANDISE' }, 
  ];

  const merchProducts = [
    { id: 1, name: "Áo Thun Soobin 'All-Rounder' Official", price: 350000, img: aosoobin, rating: 4.9 },
    { id: 2, name: "Lightstick Concert Phiên Bản Giới Hạn", price: 850000, img: lightstick, rating: 5.0 },
    { id: 3, name: "Khăn Bandana - phụ kiện “đa-zi-năng”", price: 200000, img: khanbandana, rating: 4.8 },
    { id: 4, name: "Tote Bag Vải Canvas Dày Dặn", price: 150000, img: totebag, rating: 4.7 },
    { id: 5, name: "Mũ Cap - phụ kiện thời trang", price: 150000, img: non, rating: 4.7 },
  ];

  return (
    <div className="space-y-20 pb-20 relative overflow-hidden">
      
      <div className="fixed top-1/3 -right-20 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      {/* SECTION 1: TOP 1 KỊCH SÂN KHẤU */}
      <section className="w-full overflow-visible pt-10">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 uppercase tracking-wider">
          Top 1 Kịch Sân Khấu
        </h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="pb-16 relative group"
        >
          {topEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                onClick={() => navigate(`/event-detail/${item.id}`)}
                className="rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer h-full border border-slate-100"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SECTION 2: SỰ KIỆN ĐẶC BIỆT */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10"><img src={logoTicket} alt="Logo" className="w-full h-full object-contain" /></div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">Sự kiện đặc biệt</h2>
        </div>
        <Swiper
          spaceBetween={20}
          slidesPerView={2.2}
          breakpoints={{ 640: { slidesPerView: 3.2 }, 1024: { slidesPerView: 5 } }}
          className="pb-6"
        >
          {specialEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                onClick={() => navigate(`/event-detail/${item.id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full border border-slate-50"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {item.label && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-md z-10 uppercase tracking-wider">{item.label}</div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SECTION 3: MERCHANDISE COLLECTIONS */}
      <section className="w-full overflow-visible">
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-slate-900 uppercase tracking-wider">
          Merchandise Collections
        </h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="pb-16 relative group"
        >
          {merchCollections.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="px-2 md:px-0 h-full">
                <div 
                  onClick={() => navigate(`/merch-detail/1`)} 
                  className="rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer w-full aspect-[1.8/1]"
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SECTION 4: SỰ KIỆN CÙNG MERCH */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10"><img src={logoTicket} alt="Logo" className="w-full h-full object-contain" /></div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">Sự kiện cùng merch</h2>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1.5}
          navigation={true}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
          className="pb-10 group"
        >
          {merchEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                // onClick={() => navigate(`/event-detail/${item.id}`)}
                className="bg-white rounded-3xl shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col border border-blue-50/50"
              >
                <div className="aspect-[16/9] relative overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {item.label && (
                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10 uppercase tracking-widest">{item.label}</div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SECTION 5: SẢN PHẨM BÁN LẺ */}
      <section className="pt-10 border-t border-dashed border-slate-200">
        <h2 className="text-2xl md:text-3xl font-black mb-10 text-slate-900 uppercase tracking-wide">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {merchProducts.map((product) => (
            <div key={product.id} onClick={() => navigate(`/merch-detail/${product.id}`)} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative bg-slate-50">
                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors text-sm">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg text-primary">{product.price.toLocaleString()}đ</span>
                  <div className="flex items-center text-xs font-bold text-slate-500 gap-1"><Star size={12} className="text-yellow-500" fill="currentColor" /> {product.rating}</div>
                </div>
                <button className="w-full mt-2 py-3 rounded-xl font-bold bg-slate-50 text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2 text-xs">
                  <ShoppingBag size={14} /> Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;