import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { webLogo } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const NavLinks = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "#about" },
  { name: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [trackLink, setTrackedLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {  setIsAdminClicked } = useContext(AdminContext);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="flex justify-between items-center px-4 md:px-10 py-3 max-w-7xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={webLogo} alt="Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-bold text-gray-700">Wishlist Tool</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`text-gray-700 hover:text-[#18f2d2] transition ${
                trackLink === index ? "text-[#18f2d2] font-semibold" : ""
              }`}
              onClick={() => setTrackedLink(index)}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={() => setIsAdminClicked(true)}
            className="ml-4 bg-[#18f2d2] hover:bg-[#18f2d2]/80 text-white px-4 py-2 rounded-md transition"
          >
            Admin Login
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {NavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`block text-gray-700 hover:text-[#18f2d2] ${
                trackLink === index ? "text-[#18f2d2] font-semibold" : ""
              }`}
              onClick={() => {
                setTrackedLink(index);
                setMobileMenuOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => {
              setIsAdminClicked(true);
              setMobileMenuOpen(false);
            }}
            className="w-full bg-[#18f2d2] hover:bg-[#18f2d2]/80 text-white px-4 py-2 rounded-md transition mt-2"
          >
            Admin Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
