import React, { useState } from 'react';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
// Import ảnh nghệ sĩ
import soobin from '../assets/creater/soobin.jpg';
import hoangdung from '../assets/creater/hoangdung.webp';
import siro from '../assets/creater/siro.jfif';
// Import ảnh ban tổ chức (Bạn nhớ thêm ảnh vào thư mục nhé)
import spacespeakers from '../assets/creater/space.webp';
import hozofestival from '../assets/creater/hozo.png';

const CreatorsPage = () => {
  // Thêm state để quản lý bộ lọc
  const [activeTab, setActiveTab] = useState('all');

  // Thêm trường 'type' để phân loại: 'artist' (Nghệ sĩ) hoặc 'organizer' (Ban tổ chức)
  const creators = [
    { id: 1, name: 'Soobin Hoàng Sơn', job: 'Singer / Songwriter', followers: '5.2M', img: soobin, type: 'artist' },
    { id: 2, name: 'SpaceSpeakers Label', job: 'Event Organizer', followers: '1.8M', img: spacespeakers, type: 'organizer', verified: true },
    { id: 3, name: 'Mr. Siro', job: 'Musician / Producer', followers: '3.8M', img: siro, type: 'artist' },
    { id: 4, name: 'HOZO Super Fest', job: 'Festival Organizer', followers: '900K', img: hozofestival, type: 'organizer', verified: true },
    { id: 5, name: 'Hoàng Dũng', job: 'Singer', followers: '1.5M', img: hoangdung, type: 'artist' },
  ];

  // Logic lọc dữ liệu
  const filteredCreators = creators.filter(c => activeTab === 'all' || c.type === activeTab);

  return (
    <div className="py-6">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase">Đồng hành cùng Creators</h1>
        <p className="text-slate-500 text-xl font-medium">
          Khám phá Merchandise độc quyền từ các nghệ sĩ và săn vé các sự kiện bùng nổ từ những nhà tổ chức hàng đầu.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex gap-4 mb-10 border-b border-slate-200 pb-4">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
            activeTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setActiveTab('artist')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
            activeTab === 'artist' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Nghệ sĩ
        </button>
        <button 
          onClick={() => setActiveTab('organizer')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
            activeTab === 'organizer' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Ban tổ chức
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {filteredCreators.map(c => (
          <div key={c.id} className="group cursor-pointer">
            <div className="aspect-square rounded-[40px] overflow-hidden mb-6 relative shadow-lg">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              
              {/* Badge phân loại nhỏ ở góc */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                {c.type === 'artist' ? 'Nghệ sĩ' : 'Ban tổ chức'}
              </div>

              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <ArrowUpRight className="text-primary" size={32} />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors flex items-center justify-center gap-1.5">
                {c.name}
                {/* Thêm tick xanh uy tín cho Ban tổ chức */}
                {c.verified && <CheckCircle2 size={20} className="text-blue-500" />}
              </h3>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1 mb-3">{c.job}</p>
              <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-600 px-4 py-1 rounded-full text-sm font-black">
                <Star size={14} fill="currentColor" /> {c.followers} Followers
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorsPage;