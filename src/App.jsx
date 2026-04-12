import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import Context
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';

// Import Components
import Header from './components/Header';
import AuthModal from './components/AuthModal';

// Import Pages
import Home from './pages/home';
import MerchPage from './pages/MerchPage';
import MerchDetailPage from './pages/MerchDetailPage';
import TicketPage from './pages/TicketPage';
import TicketBookingPage from './pages/TicketBookingPage';
import CreatorsPage from './pages/CreatorsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import SettingsPage from './pages/SettingsPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import EventDetailPage from './pages/EventDetailPage';

// 1. Tạo component bọc hiệu ứng cho từng trang
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}    // Bắt đầu: mờ và hơi thấp
    animate={{ opacity: 1, y: 0 }}     // Hiện ra: rõ dần và về vị trí chuẩn
    exit={{ opacity: 0, y: -15 }}      // Biến mất: mờ dần và trượt nhẹ lên
    transition={{ duration: 0.4, ease: "easeOut" }} // Hiệu ứng mượt mà
  >
    {children}
  </motion.div>
);

// 2. Component xử lý chuyển động giữa các Routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    /* mode="wait" giúp trang cũ biến mất hoàn toàn rồi mới hiện trang mới */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
        <Route path="/event-detail/:id" element={<PageTransition><EventDetailPage /></PageTransition>} />
        <Route path="/book-ticket/:id" element={<PageTransition><TicketBookingPage /></PageTransition>} />
        <Route path="/merch-detail/:id" element={<PageTransition><MerchDetailPage /></PageTransition>} />
        <Route path="/merch" element={<PageTransition><MerchPage /></PageTransition>} />
        <Route path="/tickets" element={<PageTransition><TicketPage /></PageTransition>} />
        <Route path="/creators" element={<PageTransition><CreatorsPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
        <Route path="/order-details/:id" element={<PageTransition><OrderDetailsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// 3. Component App chính
function App() {
  const [authType, setAuthType] = useState(null);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col overflow-x-hidden overflow-y-scroll">
            <Header onOpenAuth={setAuthType} />

            <main className="w-full max-w-[1440px] mx-auto px-10 md:px-16 pt-12 flex-1">
              <AnimatedRoutes />
            </main>

            {authType && (
              <AuthModal
                type={authType}
                onClose={() => setAuthType(null)}
                switchType={setAuthType}
              />
            )}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;