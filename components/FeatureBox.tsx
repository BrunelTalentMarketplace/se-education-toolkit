import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <div
      className={`bg-white/90 rounded-md shadow-sm ${colSpanClass} overflow-hidden p-1`}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5, delay }}
    >
      <div
        className={cn(
          "h-full w-full bg-gray-50 rounded-md p-4 flex items-center",
          vertical ? "flex-col" : ""
        )}
      >
        {vertical ? (
          <div className="w-full">
            <div className="space-y-1 mb-2 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-2 text-xs">{description}</p>
              <div className="flex items-center justify-center">
                <Image src={imageUrl} alt={imageAlt} width={100} height={100} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="mb-4 w-1/2">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-2 text-xs">{description}</p>
            </div>
            <Image src={imageUrl} alt={imageAlt} width={100} height={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureBox;
