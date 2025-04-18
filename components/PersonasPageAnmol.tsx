"use client";

import React from "react";
import { motion } from "motion/react";

const personas = [
  {
    icon: "👨‍🏫",
    title: "Tutor",
    description:
      "Explains concepts and guides you through exercises with patience and clarity. Perfect for beginners or when learning new concepts.",
  },
  {
    icon: "👩‍💼",
    title: "Expert",
    description:
      "Provides detailed technical feedback on designs with industry-level insights. Ideal for advanced learning and professional growth.",
  },
  {
    icon: "👥",
    title: "Peer",
    description:
      "Facilitates collaborative problem-solving and design reviews in a friendly, supportive manner. Great for practicing teamwork skills.",
  },
];

const Personas: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      id = "personas" className="py-20 px-4"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
          AI Personas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 rounded-full bg-blue-500 text-white text-4xl flex items-center justify-center mx-auto mb-4">
                {persona.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {persona.title}
              </h3>
              <p className="text-gray-600 text-sm">{persona.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Personas;
