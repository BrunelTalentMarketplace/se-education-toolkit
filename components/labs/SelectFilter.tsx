import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface SelectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  options,
  value,
  onChange,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const displayValue = value || `Select ${label}`;
  const isDisabled = options.length === 0;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm transition-colors ${
          isDisabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }`}
        disabled={isDisabled}
      >
        <span className="flex items-center gap-1 sm:gap-2 truncate pr-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="truncate">{displayValue}</span>
        </span>
        <ChevronDown
          size={14}
          className={`flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${isDisabled ? "text-gray-400" : "text-gray-500"}`}
        />
      </button>

      {isOpen && !isDisabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <ul className="py-1 max-h-48 sm:max-h-60 overflow-auto">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-blue-50 transition-colors ${
                    value === option
                      ? "bg-blue-100 font-medium text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SelectFilter;
