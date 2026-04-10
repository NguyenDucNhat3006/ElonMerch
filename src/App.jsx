import React, { useState } from 'react';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';

function App() {
  const [authType, setAuthType] = useState(null); // 'login', 'register', hoặc null
  
  return (
    <div className="min-h-screen pb-20">
      <Header onOpenAuth={setAuthType} />
      
      {/* Khung nội dung chính */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        <Home />
      </main>

      {/* Modal Đăng nhập / Đăng ký */}
      {authType && (
        <AuthModal 
          type={authType} 
          onClose={() => setAuthType(null)} 
          switchType={setAuthType}
        />
      )}
    </div>
  );
}

export default App;