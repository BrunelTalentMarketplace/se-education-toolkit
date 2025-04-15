"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { PersonaType, PERSONAS } from "@/constants";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PersonasPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="w-full flex flex-col items-center py-16 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-blue-400/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 bg-[#FF9933]/5 rounded-full filter blur-[100px]" />
      </div>

      {/* Tag with animation */}
      <motion.div
        className="bg-[#FF9933]/10 p-2 rounded-full flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#FF9933]/10 rounded-full p-2 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-[#FF9933] rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <p className="text-sm font-medium">How it works</p>
      </motion.div>

      <motion.h1
        className="text-3xl font-bold mt-6 bg-gradient-to-r from-[#FF7733] via-[#FF9933] to-[#FFBB33] bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        3 Personas Available
      </motion.h1>

      {/* Personas */}
      <div className="flex flex-wrap justify-center gap-8 mt-16 md:mt-20">
        {PERSONAS.map((persona, index) => (
          <Persona
            key={persona.name}
            persona={persona}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};

const Persona = ({
  persona,
  index,
  isInView,
}: {
  persona: PersonaType;
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="flex flex-col gap-4 items-center text-center max-w-xs p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933] to-[#FFBB33] rounded-full opacity-30 blur-md" />
        <Image
          src={persona.imageUrl}
          alt={persona.name}
          width={120}
          height={120}
          className="relative z-10"
        />
      </motion.div>
      <h2 className="text-xl font-bold text-gray-800">{persona.name}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        {persona.description}
      </p>
      <motion.button
        className="mt-2 text-[#FF9933] text-sm font-medium flex items-center gap-1"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Learn more <ArrowRight size={14} />
      </motion.button>
    </motion.div>
  );
};

export default PersonasPage;
