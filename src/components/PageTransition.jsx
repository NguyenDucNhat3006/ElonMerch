import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Trạng thái bắt đầu: mờ và hơi thấp xuống
      animate={{ opacity: 1, y: 0 }}  // Trạng thái hiện tại: hiện rõ và về đúng vị trí
      exit={{ opacity: 0, y: -20 }}   // Trạng thái khi biến mất: mờ và trượt lên trên
      transition={{ duration: 0.4, ease: "easeOut" }} // Thời gian chuyển động mượt mà
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;