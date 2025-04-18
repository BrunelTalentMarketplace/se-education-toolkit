"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import FeatureBox from "./FeatureBox";
import { FEATURES } from "@/constants";

export default function FeaturePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col w-full space-y-12 py-16 relative"
    >
      {/* Background gradients with improved colors */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-400/10 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-400/10 rounded-full filter blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-blue-500/10 rounded-full filter blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Smart choices start here
        </motion.h1>
        <div className="grid grid-cols-9 gap-6 w-full">
          {FEATURES.map((feature, idx) => (
            <FeatureBox
              key={idx}
              vertical={idx == 1 || idx == 2}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
              imageAlt={feature.imageAlt}
              colSpan={feature.colSpan}
              delay={feature.delay + (isInView ? 0 : 0.5)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
