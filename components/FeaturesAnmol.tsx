"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function FeaturesAnmol() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      id = "features" className="w-full bg-gradient-to-b from-green-100 to-green-200 py-20 px-4"
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-300/10 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-300/10 rounded-full filter blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-green-300/10 rounded-full filter blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              AI-Powered Learning
            </h3>
            <p className="text-gray-600">
              Leverage cutting-edge LLMs to provide personalized feedback and guidance through complex software engineering concepts.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Gamified Approach
            </h3>
            <p className="text-gray-600">
              Learn through engaging game mechanics with points, rewards, and challenging scenarios that make learning fun and effective.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Interactive Exercises
            </h3>
            <p className="text-gray-600">
              Practice with real-world software engineering challenges through hands-on interactive lab exercises.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
