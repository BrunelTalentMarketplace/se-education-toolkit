"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Copy, ChevronDown, Search, Clock, Filter } from "lucide-react";

import LabStep from "@/components/labs/LabStep";
import { filterLabs, getDifficulties } from "@/lib/lab-utils";
import { getPersonas } from "@/lib/lab-utils";
import SelectFilter from "@/components/labs/SelectFilter";
import { getTopics } from "@/lib/lab-utils";
import { Lab } from "@/data";

const LabsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>([]);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const topics = getTopics();
  const personas = getPersonas();
  const difficulties = getDifficulties();

  useEffect(() => {
    if (selectedTopic && selectedPersona && selectedDifficulty) {
      const labs = filterLabs(
        selectedTopic,
        selectedPersona,
        selectedDifficulty
      );
      setFilteredLabs(labs);
      setSelectedLab(labs.length > 0 ? labs[0] : null);
    } else {
      setFilteredLabs([]);
      setSelectedLab(null);
    }
  }, [selectedTopic, selectedPersona, selectedDifficulty]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 py-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-orange-100 opacity-20" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-20" />
        <div className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-green-100 opacity-30" />
      </div>

      <div ref={ref} className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF7733] via-[#FF9933] to-[#FFBB33] bg-clip-text text-transparent">
            AI-Powered Labs
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Select your topic, persona, and difficulty level to access
            interactive learning materials designed to enhance your software
            engineering skills.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SelectFilter
            label="Topic"
            options={topics.map((topic) => capitalizeFirstLetter(topic))}
            value={selectedTopic}
            onChange={setSelectedTopic}
            icon={<Search size={18} />}
          />

          <SelectFilter
            label="Persona"
            options={personas.map((persona) => capitalizeFirstLetter(persona))}
            value={selectedPersona}
            onChange={setSelectedPersona}
            icon={<Search size={18} />}
          />

          <SelectFilter
            label="Difficulty"
            options={difficulties.map((difficulty) =>
              capitalizeFirstLetter(difficulty)
            )}
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
            icon={<Search size={18} />}
          />
        </motion.div>

        {/* Lab Content */}
        {selectedLab ? (
          <motion.div
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedLab.title}
            </h2>
            {selectedLab.description && (
              <p className="text-gray-600 mb-6">{selectedLab.description}</p>
            )}

            <div className="space-y-8">
              {selectedLab.steps.map((step, index) => (
                <LabStep
                  key={index}
                  step={step}
                  index={index}
                  copyToClipboard={copyToClipboard}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-[#FF9933]/10 rounded-full">
                <Filter size={64} className="text-[#FF9933]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Lab Selected
            </h3>
            <p className="text-gray-600">
              Select a topic, persona, and difficulty level to view available
              labs.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LabsPage;
