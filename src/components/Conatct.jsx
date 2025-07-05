import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="mx-auto p-6 ">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">Contact Us</h2>
      <p className="text-center text-gray-600 max-w-md mx-auto">
        Have questions, feedback, or partnership inquiries? We'd love to hear from you.
      </p>

      <div className="space-y-6 py-4 flex flex-wrap sm:flex-nowrap justify-between sm:justify-center items-center space-x-3.5 ">
        <div className="flex items-start space-x-4">
          <Mail className="text-[#18f2d2] mt-1" />
          <div>
            <h4 className="font-semibold text-gray-700">Email</h4>
            <p className="text-gray-600">support@pricecomparetool.in</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="text-[#18f2d2] mt-1" />
          <div>
            <h4 className="font-semibold text-gray-700">Phone</h4>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MapPin className="text-[#18f2d2] mt-1" />
          <div>
            <h4 className="font-semibold text-gray-700">Location</h4>
            <p className="text-gray-600">Kishanganj, Bihar, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
