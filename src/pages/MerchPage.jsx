import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import logoTicket from '../assets/banner/logoticket.png';


// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import event1 from '../assets/event/pven1.png';
import event2 from '../assets/event/pven2.png';
import event3 from '../assets/event/pven3.png';
import ban1 from '../assets/banner/ban1.png';
import ban2 from '../assets/banner/ban2.png';



const MerchPage = () => {
    // Dữ liệu cho Slider to phía trên
    const merchCollections = [
        { id: 1, title: '', img: ban1 },
        { id: 2, title: '', img: ban2 },
        // { id: 3, title: '', img: 'https://picsum.photos/seed/elon/1000/500' },
    ];

    // Dữ liệu cho phần Sự kiện cùng merch phía dưới
    const merchEvents = [
        { id: 1, title: '', img: event1 },
        { id: 2, title: '', img: event2 },
        { id: 3, title: '', img: event3, label: 'MERCHANDISE' },
        // { id: 4, title: 'Show của Đen', img: 'https://picsum.photos/seed/event4/400/600' },
        // { id: 5, title: 'Vũ - Bảo Tàng Của Nuối Tiếc', img: 'https://picsum.photos/seed/event5/400/600' },
    ];

    return (
        <div className="space-y-14 pb-20">

            {/* Section: MERCHANDISE COLLECTIONS */}
            <section className="w-full overflow-visible">
                <h2 className="text-3xl md:text-4xl font-black mt-10 mb-10 text-slate-900 uppercase tracking-wider">
                    Merchandise Collections
                </h2>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 }, // Hiện đúng 2 slide to như thiết kế
                    }}
                    loop={true}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="pb-16 relative group"
                >
                    {merchCollections.map((item) => (
                        <SwiperSlide key={item.id}>
                            {/* Layout fit ảnh và căn giữa như cậu đã sửa ở Home */}
                            <div className="w-full h-full flex items-center justify-center px-4 md:px-10">
                                <div className="rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer w-full aspect-[1.8/1]">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                        <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Section: SỰ KIỆN CÙNG MERCH (ĐÃ CHỈNH ẢNH NGANG) */}
            <section>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <span className="text-3xl">🎟️</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">
                        Sự kiện cùng merch
                    </h2>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    // Vì ảnh giờ là chiều ngang nên mình giảm slidesPerView xuống một chút để card không bị quá bé
                    slidesPerView={1.5}
                    navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3 }, // Hiện 3 card ngang trên PC nhìn sẽ rất sang
                    }}
                    className="pb-10 px-2 group"
                >
                    {merchEvents.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col border border-blue-50/50">

                                {/* ⬇️ ĐÂY LÀ CHỖ THAY ĐỔI TỈ LỆ ⬇️ */}
                                <div className="aspect-[16/9] relative overflow-hidden flex-shrink-0">
                                    {/* Đổi từ 3/4 thành 16/9 để ảnh nằm ngang chuẩn đét */}
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {item.label && (
                                        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10 uppercase tracking-widest">
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

export default MerchPage;