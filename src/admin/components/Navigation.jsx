import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, LogOut, UserCog, FileText, Menu, X, Database, Container } from 'lucide-react';
import { LogoutUser } from '../../api/consts';
import { AdminContext } from '../../context/AdminContext';

const AdminNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { setAdminData } = useContext(AdminContext);
  const {setTrackNavigation} = useContext(AdminContext);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await LogoutUser();

      localStorage.removeItem('access_token');
      localStorage.removeItem('adminData');
      setAdminData(null);

      setSuccess(res?.message || 'Logout successful!');

      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
      
    } catch (err) {
      setError(err?.message || 'Logout failed');
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={22} />, label: 'Dashboard' , key:'dashboard' },
    { path: '/admin/users', icon: <UserCog size={22} />, label: 'Manage Users' , key:'users' },
    { path: '/admin/blogs', icon: <FileText size={22} />, label: 'Manage Blogs' ,key:'blogs' },
    { path: '/admin/scraber', icon: <Database size={22} />, label: 'Manage Scraber' ,key:'scraber' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#18f2d2] p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`h-screen w-64 bg-gradient-to-b from-[#18f2d2] to-[#10cbb0] text-gray-900 fixed top-0 left-0 shadow-2xl flex flex-col justify-between z-40 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Branding */}
        <div className="p-6 border-b border-white/20">
          <h1 
            className="text-3xl font-medium text-center tracking-wide cursor-pointer text-gray-100 hover:text-white transition"
            onClick={() => {
              navigate('/admin');
              setIsMobileOpen(false);
            }}
          >
            Admin Panel
          </h1>

          {/* Navigation */}
          <nav className="flex text-gray-100 flex-col space-y-2 px-4 mt-6">
            {navItems.map((item) => (
              <Link to={item.path} key={item.path}>
              <button
                key={item.path}
                onClick={() => {
                  setTrackNavigation(item.key);
                  setIsMobileOpen(false);
                }}
                className={`flex  items-center space-x-3 px-4 py-3 rounded-lg transition font-medium ${
                  location.pathname === item.path 
                    ? 'bg-white/30 text-white' 
                    : 'hover:bg-white/20'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                
              </button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 space-y-2">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-700 text-sm text-center">{success}</p>}

          <button 
            onClick={handleLogout}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition font-semibold ${
              isLoading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            <LogOut size={20} />
            <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNavigation;