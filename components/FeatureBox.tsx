"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FeatureBoxProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  colSpan: number;
  vertical: boolean;
  delay?: number;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  colSpan,
  vertical,
  delay = 0,
}) => {
  let colSpanClass = "";

  switch (colSpan) {
    case 3:
      colSpanClass = "col-span-3";
      break;
    case 6:
      colSpanClass = "col-span-6";
      break;
    case 9:
      colSpanClass = "col-span-9";
      break;
    default:
      colSpanClass = "col-span-3";
  }

  // Calculate starting position based on position in grid
  const getInitialPosition = () => {
    if (colSpan === 6) {
      return { x: -50, y: 0 };
    } else if (vertical) {
      return { x: 50, y: -50 };
    } else {
      return { x: 0, y: 50 };
    }
  };

  return (
    <motion.div
      className={`rounded-md shadow-md ${colSpanClass} overflow-hidden p-1 bg-gradient-to-br from-blue-100 via-white to-purple-100`}
      initial={{
        opacity: 0,
        x: getInitialPosition().x,
        y: getInitialPosition().y,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <div
        className={cn(
          "h-full w-full rounded-md p-5 flex items-center bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm",
          vertical ? "flex-col" : ""
        )}
      >
        {vertical ? (
          <div className="w-full">
            <div className="space-y-2 mb-3 flex flex-col">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{description}</p>
              <motion.div
                className="flex items-center justify-center mt-4"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image src={imageUrl} alt={imageAlt} width={100} height={100} />
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{description}</p>
            </div>
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image src={imageUrl} alt={imageAlt} width={100} height={100} />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeatureBox;
