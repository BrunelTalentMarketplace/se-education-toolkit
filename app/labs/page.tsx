"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Copy,
  ChevronDown,
  Search,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import LabStep from "@/components/labs/LabStep";
import { filterLabs } from "@/lib/lab-utils";
import { getPersonas } from "@/lib/lab-utils";
import SelectFilter from "@/components/labs/SelectFilter";
import {
  getTopics,
  getAreas,
  getCaseStudies,
  formatTopicForQuery,
} from "@/lib/lab-utils";
import { Lab, CaseStudy } from "@/data";

const LabsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Initialize state from URL params
  const initialArea = searchParams.get("area") || "";
  const initialTopic = searchParams.get("topic") || "";
  const initialPersona = searchParams.get("persona") || "";
  const initialCaseStudy = searchParams.get("caseStudy") || "";

  const [selectedArea, setSelectedArea] = useState<string>(initialArea);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [selectedPersona, setSelectedPersona] =
    useState<string>(initialPersona);
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<string>(initialCaseStudy);
  const [availableCaseStudies, setAvailableCaseStudies] = useState<CaseStudy[]>(
    []
  );
  const [filteredLabs, setFilteredLabs] = useState<Lab[]>([]);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [selectedCaseStudyData, setSelectedCaseStudyData] =
    useState<CaseStudy | null>(null);

  const areas = getAreas();
  const personas = getPersonas();
  const topics = getTopics(selectedArea);

  // Update URL when filters change
  const updateURLParams = (
    area: string,
    topic: string,
    persona: string,
    caseStudy: string
  ) => {
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (topic) params.set("topic", topic);
    if (persona) params.set("persona", persona);
    if (caseStudy) params.set("caseStudy", caseStudy);

    // Update URL without refreshing the page
    router.push(`/labs?${params.toString()}`, { scroll: false });
  };

  // Reset topic and case study when area changes
  useEffect(() => {
    const newTopic = "";
    const newCaseStudy = "";
    setSelectedTopic(newTopic);
    setSelectedCaseStudy(newCaseStudy);
    setAvailableCaseStudies([]);

    // Update URL
    if (selectedArea) {
      updateURLParams(selectedArea, newTopic, selectedPersona, newCaseStudy);
    }
  }, [selectedArea]);

  // Update available case studies when topic changes
  useEffect(() => {
    if (selectedArea && selectedTopic) {
      const caseStudies = getCaseStudies(selectedArea, selectedTopic);
      setAvailableCaseStudies(caseStudies);

      // Reset case study selection
      const newCaseStudy = "";
      setSelectedCaseStudy(newCaseStudy);

      // Update URL
      updateURLParams(
        selectedArea,
        selectedTopic,
        selectedPersona,
        newCaseStudy
      );
    } else {
      setAvailableCaseStudies([]);
      setSelectedCaseStudy("");
    }
  }, [selectedArea, selectedTopic]);

  // Update persona selection
  useEffect(() => {
    if (selectedPersona) {
      updateURLParams(
        selectedArea,
        selectedTopic,
        selectedPersona,
        selectedCaseStudy
      );
    }
  }, [selectedPersona]);

  // Update case study selection
  useEffect(() => {
    if (selectedCaseStudy) {
      updateURLParams(
        selectedArea,
        selectedTopic,
        selectedPersona,
        selectedCaseStudy
      );
    }
  }, [selectedCaseStudy]);

  // Filter labs based on selected criteria
  useEffect(() => {
    if (selectedArea && selectedTopic && selectedPersona && selectedCaseStudy) {
      const result = filterLabs(
        selectedArea,
        selectedTopic,
        selectedPersona,
        selectedCaseStudy
      );

      setFilteredLabs(result.labs);
      setSelectedCaseStudyData(result.selectedCaseStudy);
      setSelectedLab(result.labs.length > 0 ? result.labs[0] : null);
    } else {
      setFilteredLabs([]);
      setSelectedLab(null);
      setSelectedCaseStudyData(null);
    }
  }, [selectedArea, selectedTopic, selectedPersona, selectedCaseStudy]);

  const handleDownload = (filePath: string | undefined) => {
    if (filePath) {
      const link = document.createElement("a");
      link.href = filePath;
      link.download = filePath.split("/").pop() || "lab-sheet.html";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
            Select your area, topic, persona, and case study to access
            interactive learning materials designed to enhance your software
            engineering skills.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SelectFilter
            label="Area"
            options={areas.map((area) => capitalizeFirstLetter(area))}
            value={selectedArea}
            onChange={setSelectedArea}
            icon={<Search size={18} />}
          />

          <SelectFilter
            label="Topic"
            options={topics}
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
            label="Case Study"
            options={availableCaseStudies.map((study) => study.name)}
            value={
              selectedCaseStudy
                ? availableCaseStudies.find((s) => s.id === selectedCaseStudy)
                    ?.name || ""
                : ""
            }
            onChange={(name) => {
              const study = availableCaseStudies.find((s) => s.name === name);
              setSelectedCaseStudy(study ? study.id : "");
            }}
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedLab.title}
                </h2>
                {selectedLab.description && (
                  <p className="text-gray-600">{selectedLab.description}</p>
                )}
              </div>
              {selectedLab.downloadFile && (
                <button
                  onClick={() => handleDownload(selectedLab.downloadFile)}
                  className="flex items-center justify-center gap-2 bg-[#FF9933] hover:bg-[#E67300] text-white font-medium py-2 px-4 rounded-lg transition-colors min-w-40"
                >
                  <Download size={18} />
                  Download Lab Sheet
                </button>
              )}
            </div>

            <div className="space-y-8">
              {selectedLab.steps.map((step, index) => (
                <LabStep
                  key={index}
                  step={step}
                  index={index}
                  copyToClipboard={copyToClipboard}
                  caseStudy={index === 1 ? selectedCaseStudyData : null}
                  isSecondStep={index === 1}
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
              Select an area, topic, persona, and case study to view available
              labs.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LabsPage;
