import { IndianRupee, ShoppingCart, Clock, ShieldCheck } from 'lucide-react';

const WhyUseIt = () => {
  return (
    <div className="mx-auto p-6 mt-10 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">Why Use This Price Comparison Tool?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-700">
        <div className="flex items-start space-x-4">
          <IndianRupee className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h4 className="font-semibold text-lg">Save Money</h4>
            <p className="text-sm text-gray-600">Quickly compare prices from multiple platforms to find the best deals and offers available online.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ShoppingCart className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h4 className="font-semibold text-lg">Shop Smarter</h4>
            <p className="text-sm text-gray-600">Avoid paying extra by seeing price variations across trusted Indian e-commerce platforms.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h4 className="font-semibold text-lg">Save Time</h4>
            <p className="text-sm text-gray-600">No need to manually check every site. Our tool brings price comparisons to your fingertips instantly.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ShieldCheck className="text-[#18f2d2] h-8 w-8" />
          <div>
            <h4 className="font-semibold text-lg">Verified Sources</h4>
            <p className="text-sm text-gray-600">We pull data only from reliable platforms like Flipkart, Amazon, Myntra, and more to ensure trustworthy comparisons.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUseIt;
