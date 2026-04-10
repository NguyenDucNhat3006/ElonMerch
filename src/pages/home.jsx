import React from 'react';
// Import thư viện Swiper và các module cần thiết
import { Swiper, SwiperSlide } from 'swiper/react';
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
// 1. Thêm Navigation vào phần import module
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// 2. Thêm CSS cho Navigation
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Thêm dòng này


// Import CSS mặc định của Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const Home = () => {
  const topEvents = [
    { id: 1, title: '', img: leChiVien },
    { id: 2, title: '', img: bannerThuocDang },
    { id: 3, title: '', img: concert },
    { id: 4, title: '', img: hoathinh },
  ];

  const specialEvents = [
    { id: 1, title: '', img: event1, label: null },
    { id: 2, title: '', img: event2, label: 'Giảm 50%' },
    { id: 3, title: '', img: event3, label: 'MERCHANDISE' },
    { id: 4, title: '', img: event4, label: null },
    { id: 5, title: '', img: event5, label: null },
    // { id: 6, title: 'Rap Việt All-Star', img: 'https://picsum.photos/seed/6/400/600', label: 'HOT' },
  ];

  return (
    <div className="space-y-14 pb-20">

      {/* Section: TOP 1 KỊCH SÂN KHẤU */}
      <section className="w-full overflow-visible">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 uppercase tracking-wider">
          Top 1 Kịch Sân Khấu
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]} // Thêm Navigation vào đây
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }, // Hiện đúng 2 ảnh trên Tablet/PC
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true} // Kích hoạt nút bấm qua lại
          className="pb-16 relative group" // Thêm group để hiện nút khi hover
        >
          {topEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer h-full">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <h3 className="text-white font-bold text-xl md:text-3xl drop-shadow-lg uppercase">
                    {item.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Section: SỰ KIỆN ĐẶC BIỆT */}
      <section>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={logoTicket}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">
            Sự kiện đặc biệt
          </h2>
        </div>

        {/* Slider cho sự kiện nhỏ (Không autoplay, vuốt tự do) */}
        <Swiper
          spaceBetween={20}
          slidesPerView={2.2} // Trên điện thoại thấy 2 ảnh và 1 phần ảnh 3
          breakpoints={{
            640: { slidesPerView: 3.2 },
            1024: { slidesPerView: 5 }, // PC hiện 5 ảnh
          }}
          className="pb-6 pt-2 px-2 -mx-2"
        >
          {specialEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.label && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                      {item.label}
                    </div>
                  )}
                </div>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
};

export default Home;