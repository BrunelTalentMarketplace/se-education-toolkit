"use client";

import React from "react";
import { motion } from "motion/react";

const Assessments: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      id="assessments"
      className="w-full bg-gradient-to-b from-green-100 to-green-200 py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          Assessment
        </h2>
        <div className="inline-block bg-yellow-100 px-6 py-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-900">
            ⏳ Coming Soon...
          </h3>
        </div>
      </div>
    </motion.section>
  );
};

export default Assessments;
