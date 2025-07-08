import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessToast = ({ message, show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-25 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-2 z-80"
        >
          <CheckCircle size={20} />
          <span>{message}</span>
          <button onClick={onClose} className="ml-2 font-bold hover:text-gray-200">×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
