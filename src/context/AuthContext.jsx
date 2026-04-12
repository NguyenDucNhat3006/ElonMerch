import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //  LẤY PHIÊN ĐĂNG NHẬP HIỆN TẠI (SESSION)
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem('elon_session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  //  LƯU SESSION & ĐỒNG BỘ VÀO "DATABASE" MỖI KHI CÓ THAY ĐỔI
  useEffect(() => {
    if (user) {
      // Lưu trạng thái đang đăng nhập
      localStorage.setItem('elon_session', JSON.stringify(user));
      
      // LƯU VÀO DATABASE ĐỂ KHÔNG BỊ MẤT KHI ĐĂNG XUẤT
      const db = JSON.parse(localStorage.getItem('elon_users_db')) || {};
      db[user.email] = user; // Dùng email làm chìa khóa (key)
      localStorage.setItem('elon_users_db', JSON.stringify(db));
    } else {
      // Khi Đăng xuất: Chỉ xóa phiên đăng nhập, KHÔNG xóa dữ liệu trong DB
      localStorage.removeItem('elon_session');
    }
  }, [user]);

  //  HÀM ĐĂNG NHẬP THÔNG MINH
  const login = (userData) => {
    const db = JSON.parse(localStorage.getItem('elon_users_db')) || {};
    
    // Nếu email này đã từng tồn tại trong DB -> Lấy lại Avatar, Tên, Đơn hàng cũ
    if (db[userData.email]) {
      setUser(db[userData.email]);
    } else {
      // Nếu email mới toanh -> Dùng dữ liệu mặc định
      setUser(userData);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (newInfo) => {
    setUser((prevUser) => {
      return { ...prevUser, ...newInfo }; 
    });
  };

  const addOrder = (order) => {
    setUser((prevUser) => {
      const currentOrders = prevUser?.orders || [];
      return { ...prevUser, orders: [order, ...currentOrders] };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);