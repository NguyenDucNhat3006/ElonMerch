import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import soobin from '../assets/creater/soobin.jpg';
import siro from '../assets/creater/siro.jfif';
import hoangdung from '../assets/creater/hoangdung.webp';


const CreatorsPage = () => {
  const creators = [
    { id: 1, name: 'Soobin Hoàng Sơn', job: 'Singer / Songwriter', followers: '5.2M', img: soobin },
    { id: 2, name: 'Mr. Siro', job: 'Musician / Producer', followers: '3.8M', img: siro },
    { id: 3, name: 'Hoàng Dũng', job: 'Singer', followers: '1.5M', img: hoangdung },
  ];

  return (
    <div className="py-6">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase">Đồng hành cùng Creators</h1>
        <p className="text-slate-500 text-xl font-medium">Khám phá những bộ sưu tập Merchandise độc quyền từ các nghệ sĩ yêu thích của bạn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {creators.map(c => (
          <div key={c.id} className="group cursor-pointer">
            <div className="aspect-square rounded-[40px] overflow-hidden mb-6 relative shadow-lg">
              <img src={c.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <ArrowUpRight className="text-primary" size={32} />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{c.name}</h3>
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