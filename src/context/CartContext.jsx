import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm vào giỏ hàng với logic phân loại Vé và Merch
  const addToCart = (newItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Nếu món này là Vé, không cho phép tăng thêm số lượng
        if (newItem.type === 'ticket') {
          return prev; 
        }
        // Nếu là Merchandise, cộng dồn số lượng như bình thường
        return prev.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + (newItem.quantity || 1) } : item
        );
      }
      
      // Nếu chưa có trong giỏ, thêm mới hoàn toàn
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
  
  // Cập nhật số lượng: Chặn không cho chỉnh số lượng nếu là Vé
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.type !== 'ticket') {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};