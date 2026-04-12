import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Ticket, ArrowLeft, Info, Users } from 'lucide-react';

import leChiVien from '../assets/banner/lechivien.png';
import bannerThuocDang from '../assets/banner/thuocdangdatat.png';
import concert from '../assets/banner/concert.png';
import hoathinh from '../assets/banner/hoathinh.png';
// IMPORT THÊM CÁC ẢNH SỰ KIỆN MỚI
import event1 from '../assets/event/eve1.png';
import event2 from '../assets/event/eve2.png';
import event3 from '../assets/event/eve3.png';

// ĐỒNG BỘ CHÍNH XÁC ID CỦA TỪNG SỰ KIỆN
const mockEventsData = {
  "1": {
    id: "1",
    title: 'Nhà Hát Kịch IDECAF: Lệ Chi Viên (Bí Mật Vườn Lệ Chi)',
    date: '30 Tháng 04, 2026', time: '19:30 - 22:30',
    location: 'Sân Khấu Nhà Thiếu Nhi TP.HCM', address: 'Số 04 Tú Xương, Quận 3, TP. HCM',
    price: '300.000đ - 350.000đ', img: leChiVien,
    description: 'Vở diễn sân khấu sử Việt học đường "Lệ Chi Viên" tái hiện lại vụ án oan khốc liệt nhất lịch sử phong kiến Việt Nam...',
    cast: 'Quang Thảo, Thanh Thủy, Hoàng Trinh, Đại Nghĩa, Đình Toàn...'
  },
  "2": {
    id: "2",
    title: 'Soobin Live Concert - All Rounder',
    date: '15 Tháng 05, 2026', time: '19:00 - 23:30',
    location: 'The Global City, TP. Thủ Đức', address: 'Đỗ Xuân Hợp, Phường An Phú, TP. Thủ Đức',
    price: '800.000đ - 1.500.000đ', img: concert,
    description: 'Sự kiện âm nhạc bùng nổ đánh dấu chặng đường hoạt động nghệ thuật rực rỡ của Soobin...',
    cast: 'Soobin Hoàng Sơn, SpaceSpeakers, Binz, Rhymastic...'
  },
  "3": {
    id: "3",
    title: 'Workshop: Làm nến thơm cùng Elon',
    date: '25 Tháng 04, 2026', time: '09:00 - 11:30',
    location: 'Elon Merch Studio, Quận 1', address: '123 Đường Pasteur, Quận 1, TP. HCM',
    price: '200.000đ - 500.000đ', img: 'https://picsum.photos/seed/ws/800/450',
    description: 'Trải nghiệm tự tay làm ra những lọ nến thơm mang đậm dấu ấn cá nhân...',
    cast: 'Chuyên gia hương liệu Elon'
  },
  "4": {
    id: "4",
    title: 'Kịch IDECAF: Thuốc Đắng Dã Tật',
    date: '05 Tháng 05, 2026', time: '20:00 - 23:00',
    location: 'Nhà Hát Bến Thành', address: '6 Mạc Đĩnh Chi, Bến Nghé, Quận 1, TP. HCM',
    price: '250.000đ - 400.000đ', img: bannerThuocDang,
    description: 'Một vở hài kịch trào phúng mang đậm phong cách IDECAF, mang lại tiếng cười sâu cay...',
    cast: 'Thành Lộc, Hữu Châu, Lê Khánh, Đình Toàn...'
  },
  "5": {
    id: "5",
    title: 'Lễ Hội Hoạt Hình 3D Toàn Cầu',
    date: '01 Tháng 06, 2026', time: '09:00 - 21:00',
    location: 'Trung tâm Triển lãm SECC', address: '799 Nguyễn Văn Linh, Quận 7, TP.HCM',
    price: '150.000đ - 250.000đ', img: hoathinh,
    description: 'Lễ hội trình diễn các tác phẩm hoạt hình 3D đặc sắc đến từ các studio hàng đầu...',
    cast: 'Các Studio hoạt hình quốc tế'
  },
  // THÊM MỚI 3 SỰ KIỆN Ở TRANG CHỦ
  "6": {
    id: "6",
    title: 'Sân Khấu Quốc Thảo: Dưới Màn Son',
    date: '10 Tháng 05, 2026', time: '19:30 - 22:30',
    location: 'Sân Khấu Quốc Thảo', address: 'Quận 3, TP. HCM',
    price: '200.000đ - 300.000đ', img: event1,
    description: 'Phóng tác từ Truyện Kiều của Đại thi hào Nguyễn Du. Vở diễn mang đến một góc nhìn đương đại đầy trăn trở và xúc động về thân phận người phụ nữ.',
    cast: 'NS Quốc Thảo, Minh Nhí, Ngọc Trinh, Tuyết Thu...'
  },
  "7": {
    id: "7",
    title: 'Hoàng Dũng - Xoay Tròn (The 2nd Studio Album)',
    date: '20 Tháng 05, 2026', time: '19:00 - 22:00',
    location: 'Nhà thi đấu Nguyễn Du', address: '116 Nguyễn Du, Quận 1, TP. HCM',
    price: '500.000đ - 1.000.000đ', img: event2,
    description: 'Đêm nhạc ra mắt album "Xoay Tròn" của Hoàng Dũng. Khán giả sẽ được đắm chìm trong không gian âm nhạc chữa lành và nhận những phần Merchandise độc quyền.',
    cast: 'Hoàng Dũng & Band nhạc'
  },
  "8": {
    id: "8",
    title: 'Super Sunday Studio - Đấu Trường Danh Vọng',
    date: '05 Tháng 04, 2026', time: '18:00 - 23:30',
    location: 'Tòa nhà CBD Premium Home', address: 'Đồng Văn Cống, Phường Cát Lái, Thủ Đức, TP.HCM',
    price: '150.000đ - 250.000đ', img: event3,
    description: 'Xem trực tiếp các tuyển thủ thi đấu Đấu Trường Danh Vọng Mùa Xuân 2026. Sự kiện eSports bùng nổ không thể bỏ lỡ dành cho giới trẻ.',
    cast: 'Tuyển thủ chuyên nghiệp Liên Quân Mobile'
  },
  "default": {
    id: "default",
    title: 'Sự kiện đang cập nhật',
    date: 'Đang cập nhật', time: '19:00',
    location: 'TP. Hồ Chí Minh', address: 'Đang cập nhật địa chỉ chi tiết',
    price: 'Từ 100.000đ', img: concert,
    description: 'Thông tin sự kiện đang được cập nhật. Vui lòng quay lại sau.',
    cast: 'Đang cập nhật'
  }
};

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEventsData[id] || mockEventsData["default"];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  return (
    <div className="min-h-screen bg-[#0F172A] -mt-12 -mx-10 md:-mx-16 relative overflow-hidden font-sans text-white animate-fade-in">
      <div className="absolute inset-0 z-0 opacity-40 blur-[40px] scale-110" style={{ backgroundImage: `url(${event.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-[#0F172A]"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto pt-20 pb-20 px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-300 hover:text-white font-bold mb-8 transition-all active:scale-95 w-fit bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
          <ArrowLeft size={18} /> Về trang chủ
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[450px] flex-shrink-0">
            <div className="rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 relative group">
              <img src={event.img} alt={event.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <div className="flex-1 space-y-8 mt-4 lg:mt-0">
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/20 text-blue-300 border border-primary/30 rounded-full text-xs font-black uppercase tracking-widest mb-4">Đang mở bán vé</div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 text-white shadow-black/50 drop-shadow-md">{event.title}</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 p-6 rounded-[32px] backdrop-blur-sm border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 flex-shrink-0"><Calendar size={24} /></div>
                <div><p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Thời gian</p><p className="font-black text-lg">{event.date}</p><p className="text-slate-300 text-sm">{event.time}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-red-400 flex-shrink-0"><MapPin size={24} /></div>
                <div><p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Địa điểm</p><p className="font-black text-lg line-clamp-1">{event.location}</p><p className="text-slate-300 text-sm line-clamp-2">{event.address}</p></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xl font-black text-white"><Info size={20} className="text-primary"/> Giới thiệu sự kiện</h3>
              <p className="text-slate-300 leading-relaxed text-lg">{event.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xl font-black text-white"><Users size={20} className="text-primary"/> Đạo diễn & Diễn viên</h3>
              <p className="text-slate-300 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl border border-white/5 inline-block">{event.cast}</p>
            </div>

            <div className="mt-10 p-8 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-[40px] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-2xl">
              <div><p className="text-sm font-black text-blue-300 uppercase tracking-widest mb-1">Giá vé chính thức</p><p className="text-3xl font-black text-white">{event.price}</p></div>
              <button 
                onClick={() => navigate(`/book-ticket/${event.id}`)}
                className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-blue-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(64,84,178,0.5)] active:scale-95"
              >
                <Ticket size={24} /> MUA VÉ NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;