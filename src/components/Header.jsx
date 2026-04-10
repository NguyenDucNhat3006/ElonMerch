import React, { useState } from 'react';
import { Search, Ticket } from 'lucide-react';

const Header = ({ onOpenAuth }) => {
  const [activeTab, setActiveTab] = useState('Khám phá sự kiện');
  const tabs = ['Khám phá sự kiện', 'Săn vé sự kiện', 'Mua sắm merch', 'Creators', 'Về chúng tôi'];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl cursor-pointer">
            <Ticket className="w-8 h-8 rotate-45" />
            <span>elonmerch</span>
          </div>

          <div className="flex-1 max-w-xl mx-8 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 font-semibold text-gray-700">
            <button onClick={() => onOpenAuth('login')} className="hover:text-primary transition-colors">Đăng nhập</button>
            <button onClick={() => onOpenAuth('register')} className="hover:text-primary transition-colors">Đăng ký</button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 flex gap-8 text-sm font-medium">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 relative ${activeTab === tab ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-md" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;