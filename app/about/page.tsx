"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const benefits = [
    {
      title: "Hands-on AI Experience",
      description:
        "Gain practical experience working with cutting-edge AI technologies in a guided educational environment.",
      icon: "https://placehold.co/100/FCF4EE/FF9933/png?text=AI&font=montserrat",
    },
    {
      title: "Enhanced Learning",
      description:
        "Deepen your understanding of software engineering concepts through interactive, AI-assisted exercises.",
      icon: "https://placehold.co/100/FCF4EE/FF9933/png?text=Learn&font=montserrat",
    },
    {
      title: "Research Contribution",
      description:
        "Be part of groundbreaking research that shapes the future of software engineering education.",
      icon: "https://placehold.co/100/FCF4EE/FF9933/png?text=Research&font=montserrat",
    },
  ];

  const projectDetails = [
    { label: "Duration", value: "10 hours of participation" },
    { label: "Start Date", value: "April 10, 2025" },
    { label: "Requirements", value: "Currently enrolled in CS or BC courses" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 py-16">
      {/* Background elements */}
      {isMounted && (
        <>
          <motion.div
            className="absolute top-40 -right-20 w-64 h-64 rounded-full bg-orange-100 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute bottom-40 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </>
      )}

      <div className="w-full max-w-7xl z-10">
        {/* Header */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
              About Our Project
            </h1>
            <div className="w-20 h-1 bg-[#FF9933] mx-auto rounded-full mb-8"></div>
          </motion.div>
        )}

        {/* About section */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-12 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#FF9933] mb-4">
              Research Initiative
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              This LLM Toolkit for Software Engineering Education is part of
              exciting research being conducted at Brunel University London. The
              project aims to revolutionize how students learn software
              engineering concepts through AI-assisted education.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our platform provides an innovative approach to teaching
              Requirements Engineering and UML, offering AI-powered labs with
              real-time feedback. This creates a scalable hands-on learning
              environment while maintaining academic rigor and quality.
            </p>
          </motion.div>
        )}

        {/* Project details */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-12 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#FF9933] mb-6">
              Project Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className="border border-gray-100 rounded-lg p-4 bg-white/50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {detail.label}
                  </h3>
                  <p className="text-gray-600">{detail.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[#FF9933] mb-8 text-center">
              Benefits for Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm"
                >
                  <div className="mb-4">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <button className="bg-[#FF9933] text-white px-8 rounded-md text-sm py-3 hover:bg-[#E67300] transition-colors shadow-md">
              Join the Research
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default AboutPage;
