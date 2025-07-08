import React, { useContext, useState } from 'react';
import { adminLogin } from '../api/consts';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setAdminData} = useContext(AdminContext);
    const navigate = useNavigate();
    if (!isOpen) return null;
  const handleLogin = async () => {
    try {
        setIsLoading(true);
        const data = await adminLogin(email, password);
        setError(data.error || null);
        if (data) {
            setAdminData(data);
            localStorage.setItem('adminData', JSON.stringify(data));  // Store in localStorage
            localStorage.setItem('access_token', data.access_token);  // Store token also
            navigate('/admin', { state: data });
        }
        setSuccess('Login successful!');
    } catch (error) {
        setError(error.message);
        console.error('Login failed:', error);
    } finally {
        setIsLoading(false);
    }
};

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
                { error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                {
                    success && (
                        <p className="text-green-500 text-center mb-4">{success}</p>
                    )
                  
                }
                <div className="flex flex-col space-y-5">
                    <div className='flex flex-col'>
                        <label className='mb-2 text-[#18f2d2]' htmlFor="email">Email</label>
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="Email" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18f2d2]"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 text-[#18f2d2]' htmlFor="password">Password</label>
                        <input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder="Password" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#18f2d2]"
                        />
                    </div>

                    <button 
                        onClick={handleLogin}
                        className={`bg-[#18f2d2] hover:bg-[#18f2d2]/40 text-white font-semibold py-2 rounded-md transition duration-300 ${isLoading ? 'cursor-not-allowed opacity-50 bg-[#18f2d2]/50' : ''}`}
                    >
                       {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
