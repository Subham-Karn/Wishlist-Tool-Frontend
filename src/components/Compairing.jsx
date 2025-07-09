import React, { useState } from 'react';
import { urlImage } from '../assets/assets';
import  { fetchResult } from '../api/consts';
import ComparingCard from './CompairingCard';
import { RotateCw } from 'lucide-react';
import UserDetailsPopup from './UserDetails';
import { Element } from 'react-scroll';
const Comparing = () => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  console.log(productUrl);
  
  const handleFetchData = async () => {
    if (!productUrl) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchResult(productUrl);
      if (result?.shopping_results?.length > 0) {
        setResults(result.shopping_results);
      } else {
        setError('No results found for this product');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFetchData();
  };

  return (
    <Element name="compare">
      <section  className="min-h-screen w-full p-4">
        {/* Header Section */}
          <h2 className="text-2xl text-center py-4 md:text-3xl font-bold text-gray-700">Compare Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  p-4">
          <div className="flex items-center justify-center">
            <img className="max-h-72 w-auto object-contain" src={urlImage} alt="Product Illustration" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {isClicked && <UserDetailsPopup isOpen={isClicked} onClose={() => setIsClicked(false)} results={results} productUrl={productUrl}/>}
            <label htmlFor="url" className="text-gray-700 font-medium">Product URL</label>
            <input
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setProductUrl(e.target.value)
                setIsClicked(true)
              }}
              type="url"
              placeholder="https://www.example.com"
              className="w-full border px-3 py-2 rounded-md border-gray-200 outline-none focus:ring-2 focus:ring-[#18f2d2]"
            />
            <button
              onClick={handleFetchData}
              disabled={loading}
              className={`py-2 w-full bg-gradient-to-r from-[#18f2d2] to-[#008bb0] text-white font-semibold rounded-md hover:opacity-90 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Comparing...' : 'Compare Prices'}
            </button>
          </div>
        </div>

      {/* Results Section */}
      <div className="mt-10">
        {loading && (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <RotateCw className="animate-spin h-8 w-8 text-[#008bb0]" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-40 space-y-2 text-center">
            <p className="text-red-500">{error}</p>
            <p className="text-sm text-gray-400">Try a different product URL</p>
          </div>
        )}

        {!loading && !error && results.length > 0 && ( <ComparingCard productResult={results}/>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 space-y-4 text-center text-gray-600">
            <div className="bg-[#18f2d2]/10 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#008bb0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Start Comparing Prices</h3>
            <p className="max-w-md">
              Enter a valid product URL from Flipkart, Amazon, Myntra, or Ajio to see price comparisons across platforms.
            </p>
          </div>
        )}
      </div>
      </section>
    </Element>
  );
};

export default Comparing;
