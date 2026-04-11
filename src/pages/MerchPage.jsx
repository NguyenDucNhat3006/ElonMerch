import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';



// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import ảnh của Nhật (Giữ nguyên)
import event1 from '../assets/event/pven1.png';
import event2 from '../assets/event/pven2.png';
import event3 from '../assets/event/pven3.png';
import ban1 from '../assets/banner/ban1.png';
import ban2 from '../assets/banner/ban2.png';
import logoTicket from '../assets/banner/logoticket.png';



const MerchPage = () => {
    const navigate = useNavigate(); // Hook để chuyển trang

    // Dữ liệu cho Slider to phía trên (Giữ nguyên)
    const merchCollections = [
        { id: 1, title: '', img: ban1 },
        { id: 2, title: '', img: ban2 },
    ];

    // Dữ liệu cho phần Sự kiện cùng merch phía dưới (Giữ nguyên)
    const merchEvents = [
        { id: 1, title: '', img: event1 },
        { id: 2, title: '', img: event2 },
        { id: 3, title: '', img: event3, label: 'MERCHANDISE' },
    ];

    // ⬇️ THÊM MỚI: Dữ liệu danh sách sản phẩm Merch bán lẻ ⬇️
    const merchProducts = [
        { id: 1, name: "Áo Thun Soobin 'All-Rounder' Official", price: 350000, img: 'https://picsum.photos/seed/merch1/400/400', rating: 4.9 },
        { id: 2, name: "Lightstick Concert Phiên Bản Giới Hạn", price: 850000, img: 'https://picsum.photos/seed/merch2/400/400', rating: 5.0 },
        { id: 3, name: "Nến Thơm Elon - Mùi Hương Bến Thành", price: 200000, img: 'https://picsum.photos/seed/merch3/400/400', rating: 4.8 },
        { id: 4, name: "Tote Bag Vải Canvas Dày Dặn", price: 150000, img: 'https://picsum.photos/seed/merch4/400/400', rating: 4.7 },
    ];

    return (
        <div className="space-y-14 pb-20">

            {/* Section: MERCHANDISE COLLECTIONS (Của Nhật) */}
            <section className="w-full overflow-visible">
                <h2 className="text-3xl md:text-4xl font-black mt-10 mb-10 text-slate-900 uppercase tracking-wider">
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
                            <div className="w-full h-full flex items-center justify-center px-4 md:px-10">
                                <div className="rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer w-full aspect-[1.8/1]">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Section: SỰ KIỆN CÙNG MERCH (Của Nhật) */}
            <section>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img
                            src={logoTicket}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">
                        Sự kiện cùng merch
                    </h2>
                </div>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1.5}
                    navigation={true}
                    breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
                    className="pb-10 px-2 group"
                >
                    {merchEvents.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col border border-blue-50/50">
                                <div className="aspect-[16/9] relative overflow-hidden flex-shrink-0">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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

            {/* ⬇️ THÊM MỚI: Section SẢN PHẨM BÁN LẺ ⬇️ */}
            <section className="pt-10 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <span className="text-3xl">🛍️</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-wide">
                            Sản phẩm nổi bật
                        </h2>
                    </div>
                </div>

                {/* Lưới sản phẩm (Grid) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {merchProducts.map((product) => (
                        <div
                            key={product.id}
                            // Khi click vào thẻ sẽ chuyển sang trang Chi tiết Merch
                            onClick={() => navigate(`/merch-detail/${product.id}`)}
                            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative bg-slate-50">
                                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="font-black text-lg text-primary">{product.price.toLocaleString()}đ</span>
                                    <div className="flex items-center text-xs font-bold text-slate-500 gap-1">
                                        <Star size={12} className="text-yellow-500" fill="currentColor" /> {product.rating}
                                    </div>
                                </div>
                                <button className="w-full mt-2 py-3 rounded-xl font-bold bg-slate-50 text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
                                    <ShoppingBag size={16} /> Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default MerchPage;