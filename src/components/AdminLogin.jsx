import React from 'react';

const AdminLogin = ({ isOpen, setIsOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-fade-in">
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsOpen(false)} 
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
                >
                    &times;
                </button>

                {/* Modal Content */}
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Admin Login</h2>

                <div className="flex flex-col space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18f2d2]"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18f2d2]"
                    />

                    <button 
                        className="bg-[#18f2d2] hover:bg-[#18f2d2]/80 text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
