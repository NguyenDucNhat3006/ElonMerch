import React from 'react';
import { Zap } from 'lucide-react';

// 1. IMPORT 7 ẢNH THÀNH VIÊN
import member1Img from '../assets/team/dnhat.png';
import member2Img from '../assets/team/kn.png';
import member3Img from '../assets/team/ba.png';
import member4Img from '../assets/team/tp.png';
import member5Img from '../assets/team/hp.png';
import member6Img from '../assets/team/vk.png';
import member7Img from '../assets/team/tn.png';

const AboutPage = () => {
  // 2. DỮ LIỆU ĐỘI NGŨ 7 THÀNH VIÊN
  const teamMembers = [
    { id: 1, name: 'Member 1', role: 'Leader / Developer', img: member1Img },
    { id: 2, name: 'Member 2', role: 'Frontend Developer', img: member2Img },
    { id: 3, name: 'Member 3', role: 'Backend Developer', img: member3Img },
    { id: 4, name: 'Member 4', role: 'UI/UX Designer', img: member4Img },
    { id: 5, name: 'Member 5', role: 'Tester / QA', img: member5Img },
    { id: 6, name: 'Member 6', role: 'Marketing / Content', img: member6Img },
    { id: 7, name: 'Member 7', role: 'Project Manager', img: member7Img },
  ];

  return (
    <div className="py-6 space-y-20">
      {/* --- PHẦN 1: CÂU CHUYỆN THƯƠNG HIỆU --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h1 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Mang trải nghiệm sự kiện vào từng sản phẩm.</h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-6">
            Elon Merch không chỉ là một nền tảng bán lẻ. Chúng tôi là cầu nối giữa nghệ sĩ và người hâm mộ thông qua những sản phẩm Merchandise độc bản.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6">
            <div><h4 className="text-3xl font-black text-primary">50+</h4><p className="text-xs text-slate-400 uppercase font-bold">Sự kiện</p></div>
            <div><h4 className="text-3xl font-black text-primary">10K+</h4><p className="text-xs text-slate-400 uppercase font-bold">Khách hàng</p></div>
            <div><h4 className="text-3xl font-black text-primary">07</h4><p className="text-xs text-slate-400 uppercase font-bold">Thành viên</p></div>
          </div>
        </div>
        <div className="bg-primary/5 rounded-[50px] aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <Zap size={120} className="text-primary relative z-10" />
        </div>
      </div>

      {/* --- PHẦN 2: ĐỘI NGŨ PHÁT TRIỂN (FIXED TAGS) --- */}
      <section className="bg-white rounded-[60px] p-16 shadow-sm border border-blue-50">
        <h2 className="text-3xl font-black text-center mb-16 uppercase">Đội ngũ phát triển Elon Merch</h2>
        
        {/* Dùng Flexbox để 7 người luôn căn giữa hoàn hảo */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group w-[180px]"> 
              <div className="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-md group-hover:border-primary transition-all">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-xl font-black line-clamp-1">{member.name}</h4>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{member.role}</p>
              <span className="inline-block mt-3 bg-[#F0F3FF] text-primary text-[10px] font-black px-4 py-1 rounded-full uppercase">
                Core Team
              </span>
            </div>
          ))}
        </div>
      </section> {/* <-- Thẻ section được đóng chuẩn ở đây */}
    </div>
  );
};

export default AboutPage;