import { ClipboardCopy, Link, MousePointerClick, BadgePercent, Info } from 'lucide-react';

const HowToUse = () => {
  return (
    <div className=" p-6  mx-auto  space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">
        How to Use This Price Comparison Tool
      </h2>

      <ol className="space-y-6  text-gray-700">
        <li className="flex items-start justify-center space-x-3">
          <ClipboardCopy className="text-[#18f2d2] mt-1 h-5 w-5" />
          <span>
            <span className="font-semibold">Copy Product Link:</span> Visit platforms like Flipkart, Amazon, or Ajio and copy the product URL from your browser's address bar.
          </span>
        </li>

        <li className="flex items-start justify-center space-x-3">
          <Link className="text-[#18f2d2] mt-1 h-5 w-5" />
          <span>
            <span className="font-semibold">Paste the URL:</span> Enter the copied product link into the input box provided at the top of this tool.
          </span>
        </li>

        <li className="flex items-start justify-center space-x-3">
          <MousePointerClick className="text-[#18f2d2] mt-1 h-5 w-5" />
          <span>
            <span className="font-semibold">Click Compare:</span> Press the <span className="text-[#18f2d2] font-semibold">Compare</span> button or hit Enter to fetch product prices from multiple platforms.
          </span>
        </li>

        <li className="flex items-start justify-center space-x-3">
          <BadgePercent className="text-[#18f2d2] mt-1 h-5 w-5" />
          <span>
            <span className="font-semibold">View Best Deals:</span> Scroll down to see price comparisons across Indian e-commerce platforms. Click "View Product" to visit the item on its respective platform.
          </span>
        </li>
      </ol>

      <div className="flex justify-center items-start space-x-3 bg-blue-50 p-4 rounded-lg">
        <Info className="text-[#008bb0] h-6 w-6 mt-1" />
        <p className="text-gray-600">
          This tool compares prices for publicly available products only. Some exclusive or restricted items might not appear in the results.
        </p>
      </div>
    </div>
  );
};

export default HowToUse;
