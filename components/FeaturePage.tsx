import React from "react";
import { motion } from "motion/react";
import FeatureBox from "./FeatureBox";
import { FEATURES } from "@/constants";

export default function FeaturePage() {
  return (
    <div
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   transition={{ duration: 0.7 }}
      className="min-h-screen flex flex-col px-6 md:px-12 w-full space-y-12 py-16 relative"
    >
      {/* Background gradients similar to landing page */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-theme-light/10 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-theme-light/10 rounded-full filter blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Smart choices start here
        </h1>
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
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
