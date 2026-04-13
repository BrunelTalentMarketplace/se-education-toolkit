"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { CaseStudy } from "@/data";

interface CaseStudyHierarchyProps {
  caseStudies: CaseStudy[];
  selectedCaseStudyId: string;
  onSelectionChange: (selection: {
    problemId: string;
    userStoryId: string;
    acceptanceCriteriaIds: string[];
  }) => void;
  onCaseStudyChange: (caseStudyId: string) => void;
  initialSelection?: {
    problemId: string;
    userStoryId: string;
    acceptanceCriteriaIds: string[];
  };
}

const CaseStudyHierarchy: React.FC<CaseStudyHierarchyProps> = ({
  caseStudies,
  selectedCaseStudyId,
  onSelectionChange,
  onCaseStudyChange,
  initialSelection,
}) => {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string>(selectedCaseStudyId);
  const [expandedProblems, setExpandedProblems] = useState<Set<string>>(new Set());
  const [expandedUserStories, setExpandedUserStories] = useState<Set<string>>(new Set());
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [selectedUserStoryId, setSelectedUserStoryId] = useState<string>("");
  const [selectedAcceptanceCriteriaIds, setSelectedAcceptanceCriteriaIds] = useState<string[]>([]);

  useEffect(() => {
    if (initialSelection) {
      setSelectedProblemId(initialSelection.problemId);
      setSelectedUserStoryId(initialSelection.userStoryId);
      setSelectedAcceptanceCriteriaIds(initialSelection.acceptanceCriteriaIds);
      if (initialSelection.problemId) {
        const cs = caseStudies.find((c) => c.problem.id === initialSelection.problemId);
        if (cs) setActiveCaseStudyId(cs.id);
      }
    }
  }, [initialSelection, caseStudies]);

  const activeCaseStudy = caseStudies.find((cs) => cs.id === activeCaseStudyId);
  const selectedProblem =
    activeCaseStudy && selectedProblemId === activeCaseStudy.problem.id
      ? activeCaseStudy.problem
      : null;
  const selectedUserStory = activeCaseStudy?.userStories.find(
    (us) => us.id === selectedUserStoryId
  );

  const toggleProblem = (problemId: string) => {
    setExpandedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(problemId)) next.delete(problemId);
      else next.add(problemId);
      return next;
    });
  };

  const toggleUserStory = (userStoryId: string) => {
    setExpandedUserStories((prev) => {
      const next = new Set(prev);
      if (next.has(userStoryId)) next.delete(userStoryId);
      else next.add(userStoryId);
      return next;
    });
  };

  const selectProblem = (problemId: string, cs: CaseStudy) => {
    setSelectedProblemId(problemId);
    setActiveCaseStudyId(cs.id);
    setSelectedUserStoryId("");
    setSelectedAcceptanceCriteriaIds([]);
    onCaseStudyChange(cs.id);
    onSelectionChange({ problemId, userStoryId: "", acceptanceCriteriaIds: [] });
  };

  const selectUserStory = (userStoryId: string) => {
    const newId = selectedUserStoryId === userStoryId ? "" : userStoryId;
    setSelectedUserStoryId(newId);
    setSelectedAcceptanceCriteriaIds([]);
    onSelectionChange({ problemId: selectedProblemId, userStoryId: newId, acceptanceCriteriaIds: [] });
  };

  const toggleAcceptanceCriteria = (acId: string, userStoryId: string) => {
    // Auto-select the user story if a different one is currently selected
    const effectiveUserStoryId = selectedUserStoryId !== userStoryId ? userStoryId : selectedUserStoryId;
    if (selectedUserStoryId !== userStoryId) {
      setSelectedUserStoryId(userStoryId);
      setSelectedAcceptanceCriteriaIds([acId]);
      onSelectionChange({ problemId: selectedProblemId, userStoryId, acceptanceCriteriaIds: [acId] });
      return;
    }
    const newSelected = selectedAcceptanceCriteriaIds.includes(acId)
      ? selectedAcceptanceCriteriaIds.filter((id) => id !== acId)
      : [...selectedAcceptanceCriteriaIds, acId];
    setSelectedAcceptanceCriteriaIds(newSelected);
    onSelectionChange({
      problemId: selectedProblemId,
      userStoryId: effectiveUserStoryId,
      acceptanceCriteriaIds: newSelected,
    });
  };

  if (caseStudies.length === 0) {
    return (
      <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <p className="text-gray-600">Select area and topic first to view case studies.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Hierarchy Panel */}
      <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select a Problem</h3>

        <div className="space-y-2">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="border border-gray-200 rounded-lg">
              {/* Problem header */}
              <button
                onClick={() => toggleProblem(cs.problem.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {selectedProblemId === cs.problem.id ? (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-gray-400 flex-shrink-0" />
                  )}
                  <span className="font-medium text-left text-sm truncate">{cs.name}</span>
                </div>
                {expandedProblems.has(cs.problem.id) ? (
                  <ChevronDown size={16} className="flex-shrink-0 ml-2" />
                ) : (
                  <ChevronRight size={16} className="flex-shrink-0 ml-2" />
                )}
              </button>

              <AnimatePresence>
                {expandedProblems.has(cs.problem.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 border-t border-gray-100">
                      <p className="text-sm text-gray-700 mb-2">{cs.problem.statement}</p>
                      <button
                        onClick={() => selectProblem(cs.problem.id, cs)}
                        className={`w-full text-left p-2 rounded text-sm mb-3 ${
                          selectedProblemId === cs.problem.id
                            ? "bg-blue-100 text-blue-800"
                            : "hover:bg-gray-100"
                        } transition-colors`}
                      >
                        Select this problem
                      </button>

                      {/* User Stories — only shown once this problem is selected */}
                      {selectedProblemId === cs.problem.id && (
                        <div className="border border-gray-200 rounded-lg">
                          <div className="p-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                            <h4 className="font-medium text-gray-700 text-sm">User Stories</h4>
                          </div>
                          {cs.userStories.map((us) => (
                            <div key={us.id} className="border-t border-gray-100 first:border-t-0">
                              <button
                                onClick={() => toggleUserStory(us.id)}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {selectedUserStoryId === us.id ? (
                                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle size={14} className="text-gray-400 flex-shrink-0" />
                                  )}
                                  <span className="text-left text-sm truncate">{us.statement}</span>
                                </div>
                                {expandedUserStories.has(us.id) ? (
                                  <ChevronDown size={14} className="flex-shrink-0 ml-2" />
                                ) : (
                                  <ChevronRight size={14} className="flex-shrink-0 ml-2" />
                                )}
                              </button>

                              <AnimatePresence>
                                {expandedUserStories.has(us.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-3 border-t border-gray-100">
                                      {us.description && (
                                        <p className="text-sm text-gray-600 mb-2">{us.description}</p>
                                      )}
                                      <button
                                        onClick={() => selectUserStory(us.id)}
                                        className={`w-full text-left p-2 rounded text-sm mb-2 ${
                                          selectedUserStoryId === us.id
                                            ? "bg-blue-100 text-blue-800"
                                            : "hover:bg-gray-100"
                                        } transition-colors`}
                                      >
                                        {selectedUserStoryId === us.id ? "Deselect" : "Select this user story"}
                                      </button>

                                      {/* Acceptance Criteria */}
                                      <div className="space-y-1">
                                        <h5 className="text-xs font-medium text-gray-700">
                                          Acceptance Criteria:
                                        </h5>
                                        {us.acceptanceCriteria.map((ac) => (
                                          <button
                                            key={ac.id}
                                            onClick={() => toggleAcceptanceCriteria(ac.id, us.id)}
                                            className={`w-full text-left p-2 rounded text-xs flex items-start gap-2 ${
                                              selectedAcceptanceCriteriaIds.includes(ac.id)
                                                ? "bg-green-100 text-green-800"
                                                : "hover:bg-gray-100"
                                            } transition-colors`}
                                          >
                                            <div className="mt-0.5 flex-shrink-0">
                                              {selectedAcceptanceCriteriaIds.includes(ac.id) ? (
                                                <CheckCircle size={12} className="text-green-600" />
                                              ) : (
                                                <Circle size={12} className="text-gray-400" />
                                              )}
                                            </div>
                                            <span>{ac.criteria}</span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>

        <div className="space-y-4">
          {selectedProblem && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Problem</h4>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">{selectedProblem.statement}</p>
                {selectedProblem.context && (
                  <p className="text-xs text-gray-500 mb-2">Context: {selectedProblem.context}</p>
                )}
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <p className="text-xs font-medium text-gray-600 mb-1">Personas:</p>
                  {selectedProblem.personas.map((persona) => (
                    <div key={persona.name} className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">{persona.name}</span> ({persona.role}):{" "}
                      {persona.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedUserStory && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">User Story</h4>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-800 mb-1">
                  {selectedUserStory.statement}
                </p>
                {selectedUserStory.description && (
                  <p className="text-sm text-gray-700">{selectedUserStory.description}</p>
                )}
              </div>
            </div>
          )}

          {selectedAcceptanceCriteriaIds.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">
                Acceptance Criteria ({selectedAcceptanceCriteriaIds.length} selected)
              </h4>
              <div className="bg-purple-50 p-3 rounded-lg space-y-2">
                {selectedAcceptanceCriteriaIds.map((id) => {
                  const criteria = selectedUserStory?.acceptanceCriteria.find(
                    (ac) => ac.id === id
                  );
                  return criteria ? (
                    <div key={id} className="text-sm text-gray-700 flex items-start gap-2">
                      <CheckCircle size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{criteria.criteria}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {!selectedProblem && !selectedUserStory && selectedAcceptanceCriteriaIds.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>Select items from the hierarchy to preview content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyHierarchy;
