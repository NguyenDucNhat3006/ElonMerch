import React from 'react';

const Home = () => {
  // Dữ liệu mẫu với link ảnh trực tuyến để test giao diện
  const topEvents = [
    { id: 1, title: 'Lệ Chi Viên (Bí Mật Vườn Lệ Chi)', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, title: 'Thuốc Đắng Giã Tật', img: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=1000&auto=format&fit=crop' },
  ]; 

  const specialEvents = [
    { id: 1, title: 'Lạc Lối Ở Bangkok', img: 'https://picsum.photos/seed/1/400/600', label: null },
    { id: 2, title: 'Dưới Màn Sương', img: 'https://picsum.photos/seed/2/400/600', label: 'Giảm 50%' },
    { id: 3, title: 'Xoay Tròn - Hoàng Dũng', img: 'https://picsum.photos/seed/3/400/600', label: 'MERCHANDISE' },
    { id: 4, title: 'Super Sunday Studio', img: 'https://picsum.photos/seed/4/400/600', label: null },
    { id: 5, title: 'Lê Văn Duyệt', img: 'https://picsum.photos/seed/5/400/600', label: null },
  ];

  return (
    <div className="space-y-12 pb-20 pt-4">
      {/* Section: TOP 1 KỊCH SÂN KHẤU */}
      <section>
        <h2 className="text-2xl font-black mb-6 text-gray-800 uppercase tracking-wide">
          Top 1 Kịch Sân Khấu
        </h2>
        
        {/* Khung trượt ngang */}
        <div className="flex overflow-x-auto gap-6 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-4">
          {topEvents.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[85%] md:min-w-[60%] lg:min-w-[48%] snap-center rounded-3xl overflow-hidden shadow-2xl aspect-[2/1] relative group"
            >
              {/* Ảnh bìa */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient che phủ để làm nổi bật chữ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Chữ hiển thị góc dưới */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-lg uppercase">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Nút chấm tròn (Pagination giả) */}
        <div className="flex justify-center gap-2 mt-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-md"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
        </div>
      </section>

      {/* Section: SỰ KIỆN ĐẶC BIỆT */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center rotate-45 border border-blue-100">
            <span className="text-primary font-bold text-sm -rotate-45">🎟</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Sự kiện đặc biệt</h2>
        </div>
        
        {/* Khung trượt ngang sự kiện nhỏ */}
        <div className="flex overflow-x-auto gap-5 hide-scrollbar snap-x snap-mandatory pb-6 pt-2 px-2 -mx-2">
          {specialEvents.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[180px] w-[180px] md:min-w-[220px] md:w-[220px] snap-start bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Nhãn Tag (Ví dụ: Giảm 50%) */}
                {item.label && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {item.label}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-800 line-clamp-2 hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;