import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email) => {
    setUser({
      name: 'Nguyễn Đức Nhật',
      email: email,
      phone: '0987654321',
      address: 'Khu phố 6, Linh Trung, Thủ Đức, TP.HCM',
      orders: [] // Luôn khởi tạo mảng rỗng
    });
  };

  const addOrder = (newOrder) => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        orders: [newOrder, ...(prev.orders || [])]
      };
    });
  };

  const updateUser = (newData) => {
    setUser(prev => (prev ? { ...prev, ...newData } : prev));
  };

  const register = (email) => {
    setUser({ name: 'Thành viên mới', email, phone: '', address: '', orders: [] });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};