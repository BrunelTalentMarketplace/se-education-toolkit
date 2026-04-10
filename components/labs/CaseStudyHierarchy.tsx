"use client";

import React, { useState } from "react";
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
  initialSelection,
}) => {
  const [expandedProblems, setExpandedProblems] = useState<Set<string>>(new Set());
  const [expandedUserStories, setExpandedUserStories] = useState<Set<string>>(new Set());
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [selectedUserStoryId, setSelectedUserStoryId] = useState<string>("");
  const [selectedAcceptanceCriteriaIds, setSelectedAcceptanceCriteriaIds] = useState<string[]>([]);

  // Initialize state from props
  React.useEffect(() => {
    if (initialSelection) {
      setSelectedProblemId(initialSelection.problemId);
      setSelectedUserStoryId(initialSelection.userStoryId);
      setSelectedAcceptanceCriteriaIds(initialSelection.acceptanceCriteriaIds);
    }
  }, [initialSelection]);

  const selectedCaseStudy = caseStudies.find(cs => cs.id === selectedCaseStudyId);

  const toggleProblem = (problemId: string) => {
    const newExpanded = new Set(expandedProblems);
    if (newExpanded.has(problemId)) {
      newExpanded.delete(problemId);
    } else {
      newExpanded.add(problemId);
    }
    setExpandedProblems(newExpanded);
  };

  const toggleUserStory = (userStoryId: string) => {
    const newExpanded = new Set(expandedUserStories);
    if (newExpanded.has(userStoryId)) {
      newExpanded.delete(userStoryId);
    } else {
      newExpanded.add(userStoryId);
    }
    setExpandedUserStories(newExpanded);
  };

  const selectProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    setSelectedUserStoryId("");
    setSelectedAcceptanceCriteriaIds([]);
    onSelectionChange({
      problemId,
      userStoryId: "",
      acceptanceCriteriaIds: [],
    });
  };

  const selectUserStory = (userStoryId: string) => {
    setSelectedUserStoryId(userStoryId);
    setSelectedAcceptanceCriteriaIds([]);
    onSelectionChange({
      problemId: selectedProblemId,
      userStoryId,
      acceptanceCriteriaIds: [],
    });
  };

  const toggleAcceptanceCriteria = (acceptanceCriteriaId: string) => {
    const newSelected = selectedAcceptanceCriteriaIds.includes(acceptanceCriteriaId)
      ? selectedAcceptanceCriteriaIds.filter(id => id !== acceptanceCriteriaId)
      : [...selectedAcceptanceCriteriaIds, acceptanceCriteriaId];
    
    setSelectedAcceptanceCriteriaIds(newSelected);
    onSelectionChange({
      problemId: selectedProblemId,
      userStoryId: selectedUserStoryId,
      acceptanceCriteriaIds: newSelected,
    });
  };

  if (!selectedCaseStudy) {
    return (
      <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <p className="text-gray-600">Select area and topic first to view case studies.</p>
      </div>
    );
  }

  const selectedProblem = selectedCaseStudy.problem;
  const selectedUserStory = selectedCaseStudy.userStories.find(us => us.id === selectedUserStoryId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Hierarchy Panel */}
      <div className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Case Study: {selectedCaseStudy.name}</h3>

        <div className="space-y-2">
          {/* Problem Level */}
          <div className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleProblem(selectedCaseStudy.problem.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                {selectedProblemId === selectedCaseStudy.problem.id ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Circle size={16} className="text-gray-400" />
                )}
                <span className="font-medium text-left">Problem</span>
              </div>
              {expandedProblems.has(selectedCaseStudy.problem.id) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            <AnimatePresence>
              {expandedProblems.has(selectedCaseStudy.problem.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700 mb-2">{selectedCaseStudy.problem.statement}</p>
                    <button
                      onClick={() => selectProblem(selectedCaseStudy.problem.id)}
                      className={`w-full text-left p-2 rounded ${
                        selectedProblemId === selectedCaseStudy.problem.id
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      } transition-colors`}
                    >
                      Select this problem
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Stories Level */}
          {selectedProblemId && (
            <div className="border border-gray-200 rounded-lg">
              <div className="p-3 border-b border-gray-100">
                <h4 className="font-medium text-gray-800">User Stories</h4>
              </div>

              {selectedCaseStudy.userStories.map((userStory) => (
                <div key={userStory.id} className="border-t border-gray-100">
                  <button
                    onClick={() => toggleUserStory(userStory.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {selectedUserStoryId === userStory.id ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Circle size={16} className="text-gray-400" />
                      )}
                      <span className="font-medium text-left text-sm">{userStory.statement}</span>
                    </div>
                    {expandedUserStories.has(userStory.id) ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedUserStories.has(userStory.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 border-t border-gray-100">
                          {userStory.description && (
                            <p className="text-sm text-gray-700 mb-2">{userStory.description}</p>
                          )}
                          <button
                            onClick={() => selectUserStory(userStory.id)}
                            className={`w-full text-left p-2 rounded mb-2 ${
                              selectedUserStoryId === userStory.id
                                ? "bg-blue-100 text-blue-800"
                                : "hover:bg-gray-100"
                            } transition-colors`}
                          >
                            Select this user story
                          </button>

                          {/* Acceptance Criteria */}
                          <div className="space-y-1">
                            <h5 className="text-sm font-medium text-gray-700">Acceptance Criteria:</h5>
                            {userStory.acceptanceCriteria.map((ac) => (
                              <button
                                key={ac.id}
                                onClick={() => toggleAcceptanceCriteria(ac.id)}
                                className={`w-full text-left p-2 rounded text-sm flex items-start gap-2 ${
                                  selectedAcceptanceCriteriaIds.includes(ac.id)
                                    ? "bg-green-100 text-green-800"
                                    : "hover:bg-gray-100"
                                } transition-colors`}
                              >
                                <div className="mt-0.5">
                                  {selectedAcceptanceCriteriaIds.includes(ac.id) ? (
                                    <CheckCircle size={14} className="text-green-600" />
                                  ) : (
                                    <Circle size={14} className="text-gray-400" />
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
                  {selectedProblem.personas.map((persona, index) => (
                    <div key={persona.name} className="text-xs text-gray-600 mb-1">
                      <span className="font-medium">{persona.name}</span> ({persona.role}): {persona.description}
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
                <p className="text-sm font-medium text-gray-800 mb-1">{selectedUserStory.statement}</p>
                {selectedUserStory.description && (
                  <p className="text-sm text-gray-700">{selectedUserStory.description}</p>
                )}
              </div>
            </div>
          )}

          {selectedAcceptanceCriteriaIds.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Acceptance Criteria ({selectedAcceptanceCriteriaIds.length} selected)</h4>
              <div className="bg-purple-50 p-3 rounded-lg space-y-2">
                {selectedAcceptanceCriteriaIds.map(id => {
                  const criteria = selectedUserStory?.acceptanceCriteria.find(ac => ac.id === id);
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