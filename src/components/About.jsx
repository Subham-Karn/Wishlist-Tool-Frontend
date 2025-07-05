import { Info, ShieldCheck, Globe2, BadgeCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="mx-auto p-6 mt-10 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">About This Tool</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="flex items-start space-x-4">
          <Info className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">What is it?</h3>
            <p className="text-gray-600">This is an Indian e-commerce price comparison tool designed to help users quickly compare product prices from platforms like Flipkart, Amazon, Ajio, and more.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ShieldCheck className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Trusted & Secure</h3>
            <p className="text-gray-600">We use reliable APIs to fetch publicly listed product prices, ensuring secure and authentic data display.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Globe2 className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">For All Shoppers</h3>
            <p className="text-gray-600">Whether you're a casual buyer or deal hunter, this tool simplifies your product research by showing prices in one place.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <BadgeCheck className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Save Money</h3>
            <p className="text-gray-600">Find the best deals instantly and avoid overpaying for your favorite products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
