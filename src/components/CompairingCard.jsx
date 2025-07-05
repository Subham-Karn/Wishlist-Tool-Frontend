import { ExternalLink, ShoppingCart } from 'lucide-react';

const ComparingCard = ({ productResult }) => {
  if (!productResult || productResult.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <ShoppingCart className="h-8 w-8 text-[#008bb0]" />
        <h3 className="text-lg mt-2">No products found to compare.</h3>
      </div>
    );
  }

  const mainProduct = productResult[0];
  const otherProducts = productResult.slice(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Main Product */}
      <div className="border border-gray-200 rounded-lg p-4 shadow space-y-4">
        <h2 className="text-xl font-bold text-gray-700">Your Selected Product</h2>
        <p className="text-gray-500">From {mainProduct.source}</p>
        <img src={mainProduct.thumbnail} alt={mainProduct.title} className="h-40 w-auto object-contain mx-auto" />
        <h3 className="text-lg font-medium">{mainProduct.title}</h3>
        <p className="text-green-600 text-xl">{mainProduct.price}</p>
        <div className="text-gray-500 text-sm">{mainProduct.delivery || 'Delivery details not available'}</div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <img src={mainProduct.source_icon} alt={mainProduct.source} className="h-5 w-5" />
            <span className="text-gray-600">{mainProduct.source}</span>
          </div>
          <a
            href={mainProduct.product_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-[#18f2d2] to-[#008bb0] text-white px-4 py-2 rounded hover:opacity-90 transition text-sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" /> View Product
          </a>
        </div>
      </div>

      {/* Best Deals */}
      <div className="space-y-4 border border-gray-200 rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold text-gray-700">Better Price Deals</h2>
        {otherProducts.filter(p => p.price.replace(/[^\d]/g, '') < mainProduct.price.replace(/[^\d]/g, '')).length === 0 ? (
          <p className="text-gray-500">No better deals found than your selected product.</p>
        ) : (
          otherProducts.map((product, index) =>
            product.price.replace(/[^\d]/g, '') < mainProduct.price.replace(/[^\d]/g, '') && (
              <div key={index} className="border border-gray-100 p-3 rounded-lg shadow flex space-x-3 items-center">
                <img src={product.thumbnail} alt={product.title} className="h-20 w-20 object-contain" />
                <div className="flex-1">
                  <h4 className="font-medium">{product.title}</h4>
                  <p className="text-green-600 font-semibold">{product.price}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <img src={product.source_icon} alt={product.source} className="h-4 w-4" />
                    <span className="text-sm text-gray-500">{product.source}</span>
                  </div>
                </div>
                <a href={product.product_link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">View</a>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ComparingCard;
