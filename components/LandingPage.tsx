import React from "react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <main className="h-screen flex flex-col items-center relative px-4 md:px-8 lg:px-12">
      <div className="w-16 aspect-square rounded-md border border-gray-300 p-2 mt-10">
        <Image
          className="rounded-full"
          src={
            "https://bruneltalentmarketplace.com/static/media/Navbar-icon.9b1893f0b90313489b9f.png"
          }
          alt="btm logo"
          width={200}
          height={200}
        />
      </div>
      {/* Main text area */}
      <div className="flex flex-col items-center mt-6 w-full max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 leading-tight text-center">
          Revolutionize, Transform, Empower
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-[#FF9933] mb-4 text-center">
          Toolkit for Next-Gen SE Curriculum Development
        </h2>
        <p className="text-sm text-gray-600 px-4 sm:px-12 md:px-20 text-center max-w-3xl line-clamp-3 md:line-clamp-none">
          AI-driven platform transforming Requirements Engineering and UML
          education. Features AI-powered labs with real-time feedback for
          scalable hands-on learning while preserving academic rigor.
        </p>
        {/* Button area */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="bg-[#FF9933] text-white px-8 rounded-md text-sm py-2 hover:bg-[#E67300] transition-colors">
            Get Started
          </button>
          <button className="text-[#FF9933] border border-[#FF9933] px-8 rounded-md text-sm py-2 hover:bg-[#FFC380] hover:text-white transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
