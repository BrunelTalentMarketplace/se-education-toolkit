"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Filter, Download, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import LabStep from "@/components/labs/LabStep";
import { filterLabs } from "@/lib/lab-utils";
import { getPersonas } from "@/lib/lab-utils";
import SelectFilter from "@/components/labs/SelectFilter";
import { getTopics, getAreas, getCaseStudies } from "@/lib/lab-utils";
import CaseStudyHierarchy from "@/components/labs/CaseStudyHierarchy";

const findMatchingOption = (options: string[], urlValue: string): string => {
  if (!urlValue) return "";
  return (
    options.find((option) => option.toLowerCase() === urlValue.toLowerCase()) || ""
  );
};

const LabsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const areas = useMemo(() => getAreas(), []);
  const personas = useMemo(() => getPersonas(), []);

  const [filters, setFilters] = useState({
    area: "",
    topic: "",
    persona: "",
    caseStudy: "",
  });

  const [hierarchySelection, setHierarchySelection] = useState({
    problemId: "",
    userStoryId: "",
    acceptanceCriteriaIds: [] as string[],
  });

  const lastParamsRef = useRef<string>("");

  const selectedArea = filters.area;
  const topics = useMemo(() => getTopics(selectedArea), [selectedArea]);

  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== lastParamsRef.current) {
      lastParamsRef.current = currentParams;
      const urlArea = findMatchingOption(areas, searchParams.get("area") || "");
      const urlTopic = findMatchingOption(topics, searchParams.get("topic") || "");
      const urlPersona = findMatchingOption(personas, searchParams.get("persona") || "");
      const urlCaseStudy = searchParams.get("caseStudy") || "";
      const urlProblemId = searchParams.get("problemId") || "";
      const urlUserStoryId = searchParams.get("userStoryId") || "";
      const urlAcceptanceCriteriaIds = searchParams.get("acceptanceCriteriaIds")?.split(",") || [];
      setFilters((prev) => {
        if (
          prev.area !== urlArea ||
          prev.topic !== urlTopic ||
          prev.persona !== urlPersona ||
          prev.caseStudy !== urlCaseStudy
        ) {
          return {
            area: urlArea,
            topic: urlTopic,
            persona: urlPersona,
            caseStudy: urlCaseStudy,
          };
        }
        return prev;
      });
      setHierarchySelection({
        problemId: urlProblemId,
        userStoryId: urlUserStoryId,
        acceptanceCriteriaIds: urlAcceptanceCriteriaIds,
      });
    }
  }, [searchParams, areas, topics, personas]);


  const selectedTopic = filters.topic;
  const explicitPersona = filters.persona;
  const explicitCaseStudy = filters.caseStudy;



  const availableCaseStudies = useMemo(() => {
    if (selectedArea && selectedTopic) {
      return getCaseStudies(selectedArea, selectedTopic);
    }
    return [];
  }, [selectedArea, selectedTopic]);

  const defaultPersona = useMemo(() => {
    if (explicitPersona) return explicitPersona;
    if (selectedArea && selectedTopic && personas.length > 0) {
      return personas[0];
    }
    return "";
  }, [explicitPersona, selectedArea, selectedTopic, personas]);

  const defaultCaseStudy = useMemo(() => {
    if (explicitCaseStudy) return explicitCaseStudy;
    if (selectedArea && selectedTopic && availableCaseStudies.length > 0) {
      return availableCaseStudies[0].id;
    }
    return "";
  }, [explicitCaseStudy, selectedArea, selectedTopic, availableCaseStudies]);

  const { filteredLabs, selectedCaseStudyData } = useMemo(() => {
    if (selectedArea && selectedTopic && defaultPersona && defaultCaseStudy) {
      const result = filterLabs(
        selectedArea,
        selectedTopic,
        defaultPersona,
        defaultCaseStudy
      );
      return {
        filteredLabs: result.labs,
        selectedCaseStudyData: result.selectedCaseStudy,
      };
    }
    return { filteredLabs: [], selectedCaseStudyData: null };
  }, [selectedArea, selectedTopic, defaultPersona, defaultCaseStudy]);

  const selectedHierarchicalData = useMemo(() => {
    if (!selectedCaseStudyData || !hierarchySelection.problemId || !hierarchySelection.userStoryId || hierarchySelection.acceptanceCriteriaIds.length === 0) return null;

    const problem = selectedCaseStudyData.problem;
    const userStory = selectedCaseStudyData.userStories.find(us => us.id === hierarchySelection.userStoryId);
    const acceptanceCriteria = hierarchySelection.acceptanceCriteriaIds
      .map(id => userStory?.acceptanceCriteria.find(ac => ac.id === id))
      .filter((ac): ac is AcceptanceCriteria => ac !== undefined);

    if (!userStory || acceptanceCriteria.length === 0) return null;

    return {
      problem,
      userStory,
      acceptanceCriteria,
    };
  }, [selectedCaseStudyData, hierarchySelection]);

  const selectedLab = filteredLabs.length > 0 ? filteredLabs[0] : null;

  const updateFilters = (updates: Record<string, string>) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (updates.area !== undefined) {
        newFilters.area = findMatchingOption(areas, updates.area);
        if (newFilters.area !== prev.area) {
          newFilters.topic = "";
          newFilters.caseStudy = "";
        }
      }
      if (updates.topic !== undefined) {
        newFilters.topic = findMatchingOption(topics, updates.topic);
        if (newFilters.topic !== prev.topic) {
          newFilters.caseStudy = "";
        }
      }
      if (updates.persona !== undefined) {
        newFilters.persona = findMatchingOption(personas, updates.persona);
      }
      if (updates.caseStudy !== undefined) {
        newFilters.caseStudy = updates.caseStudy;
      }
      return newFilters;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.area) params.set("area", filters.area.toLowerCase());
    if (filters.topic) params.set("topic", filters.topic.toLowerCase());
    if (filters.persona) params.set("persona", filters.persona.toLowerCase());
    if (filters.caseStudy) params.set("caseStudy", filters.caseStudy);
    if (hierarchySelection.problemId) params.set("problemId", hierarchySelection.problemId);
    if (hierarchySelection.userStoryId) params.set("userStoryId", hierarchySelection.userStoryId);
    if (hierarchySelection.acceptanceCriteriaIds.length > 0) params.set("acceptanceCriteriaIds", hierarchySelection.acceptanceCriteriaIds.join(","));
    router.push(`/labs?${params.toString()}`, { scroll: false });
  }, [filters, hierarchySelection, router]);

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

  const handleHierarchySelectionChange = (selection: {
    problemId: string;
    userStoryId: string;
    acceptanceCriteriaIds: string[];
  }) => {
    setHierarchySelection(selection);
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden px-4 py-10 sm:py-12 md:py-16">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-20" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-100 opacity-20" />
        <div className="absolute top-40 right-1/4 w-20 h-20 rounded-full bg-green-100 opacity-30" />
      </div>

      <div ref={ref} className="w-full max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Labs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
            Select your area and topic to access interactive learning materials.
            Persona and case study will be automatically selected, but you can
            customize them if needed.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SelectFilter
            label="Area"
            options={areas}
            value={selectedArea}
            onChange={(value) => updateFilters({ area: value })}
            icon={<Search size={18} />}
          />

          <SelectFilter
            label="Topic"
            options={topics}
            value={selectedTopic}
            onChange={(value) => updateFilters({ topic: value })}
            icon={<Search size={18} />}
          />

          <SelectFilter
            label="Persona"
            options={personas}
            value={defaultPersona}
            onChange={(value) => updateFilters({ persona: value })}
            icon={<Search size={18} />}
          />
        </motion.div>

        {selectedArea && selectedTopic && (
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CaseStudyHierarchy
              caseStudies={availableCaseStudies}
              selectedCaseStudyId={defaultCaseStudy}
              onSelectionChange={handleHierarchySelectionChange}
              initialSelection={hierarchySelection}
            />
          </motion.div>
        )}

        {selectedLab ? (
          <motion.div
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-5 md:p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-center mb-4 sm:mb-6 gap-3 md:gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                  {selectedLab.title}
                </h2>
                {selectedLab.description && (
                  <p className="text-sm sm:text-base text-gray-600">
                    {selectedLab.description}
                  </p>
                )}
              </div>
              {selectedLab.downloadFile && (
                <button
                  onClick={() => handleDownload(selectedLab.downloadFile)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors min-w-[140px] sm:min-w-[160px] md:min-w-[180px] text-sm sm:text-base whitespace-nowrap"
                >
                  <Download size={16} className="hidden sm:inline" />
                  <Download size={14} className="sm:hidden" />
                  Download Lab Sheet
                </button>
              )}
            </div>

            <div className="space-y-6 sm:space-y-8">
              {selectedLab.steps.map((step, index) => (
                <LabStep
                  key={index}
                  step={step}
                  index={index}
                  copyToClipboard={copyToClipboard}
                  caseStudy={index === 1 ? selectedHierarchicalData : null}
                  isSecondStep={index === 1}
                  topic={selectedTopic}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 sm:p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-4 sm:p-6 bg-blue-500/10 rounded-full">
                <Filter size={48} className="sm:hidden text-blue-500" />
                <Filter size={64} className="hidden sm:block text-blue-500" />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Select Area and Topic to Get Started
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Choose an area and topic to automatically load the first available
              lab. You can customize the persona and case study afterwards.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default LabsPage;
