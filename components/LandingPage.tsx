"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 pt-16 pb-24">
      {/* Background elements */}
      {isMounted && (
        <>
          <motion.div
            className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-green-100 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </>
      )}

      {/* Main text area */}
      <div className="flex flex-col items-center w-full max-w-7xl z-10">
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-2 leading-tight text-center">
              Revolutionize, Transform, Empower
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mb-6 text-center">
              Toolkit for Next-Gen SE Curriculum Development
            </h2>
            <p className="text-sm md:text-base text-gray-600 px-4 sm:px-12 md:px-20 text-center max-w-3xl mb-8">
              AI-driven platform transforming Requirements Engineering and UML
              education. Features AI-powered labs with real-time feedback for
              scalable hands-on learning while preserving academic rigor.
            </p>
          </motion.div>
        )}

        {/* Hero image/illustration */}
        {/* {isMounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl my-8"
          >
            <Image
              src="https://placehold.co/800x450/FCF4EE/FF9933/png?text=SE+Toolkit+Platform&font=montserrat"
              alt="Platform illustration"
              width={800}
              height={450}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        )} */}

        {/* Button area */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <button
              onClick={() => router.push("/labs")}
              className="bg-blue-500 text-white px-8 rounded-md text-sm py-2 hover:bg-blue-600 transition-colors shadow-md"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/about")}
              className="text-blue-500 border border-blue-500 px-8 rounded-md text-sm py-2 hover:bg-blue-200 hover:text-white transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
