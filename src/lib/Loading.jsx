import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
            <motion.div
                className="h-16 w-16 border-4 border-t-[#18f2d2] border-gray-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            />
        </div>
    );
};

export default LoadingSpinner;
