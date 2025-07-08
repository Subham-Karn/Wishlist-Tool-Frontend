import React from 'react';
import { heroImage } from '../assets/assets';
import { Link } from 'react-scroll';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 h-auto md:h-screen bg-gray-50 overflow-hidden">

      {/* Glass Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187322d9a128?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      </div>

      {/* Text Content */}
      <div className="z-10 max-w-lg text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#18f2d2] to-[#008bb0] bg-clip-text text-transparent">
          Track Prices & Save Big!
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Compare product prices across Flipkart, Amazon, and more. Get alerts, discounts, and never overpay again!
        </p>
        <Link to="compare" smooth={true} duration={500}>
          <button  className="px-8 py-3 bg-gradient-to-r from-[#18f2d2] to-[#008bb0] text-white rounded-full font-medium hover:scale-105 transition">
            Start Comparing
          </button>
        </Link>
      </div>

      {/* Illustration Image */}
      <div className="z-10 mb-12 md:mb-0">
        <img
          src={heroImage}
          alt="Deals Illustration"
          className="w-72 md:w-[450px] animate-float"
        />
      </div>

    </section>
  );
};

export default HeroSection;
