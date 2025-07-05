import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <p className="text-sm text-gray-600">
            A simple price comparison tool to help you find the best deals across Indian e-commerce platforms like Amazon, Flipkart, and more.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#18f2d2]" /> <span>+91 98765 43210</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#18f2d2]" /> <span>support@comparetool.in</span>
            </p>
          </div>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#18f2d2] transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-[#18f2d2] transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-[#18f2d2] transition">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-200 mt-6">
        © {new Date().getFullYear()} CompareTool. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
