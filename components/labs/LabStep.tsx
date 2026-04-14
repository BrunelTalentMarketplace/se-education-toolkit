import { Copy, Clock, Check } from "lucide-react";
import { useState } from "react";
import { Step, TopicHierarchy, DEFAULT_HIERARCHY } from "@/data/index";
import { Problem, UserStoryExample, AcceptanceCriteria } from "@/data";

interface LabStepProps {
  step: Step;
  index: number;
  copyToClipboard: (text: string) => void;
  caseStudy?: {
    problem: Problem;
    userStory: UserStoryExample | null;
    acceptanceCriteria: AcceptanceCriteria[];
  } | null;
  isSecondStep?: boolean;
  hierarchy?: TopicHierarchy;
  personaIntro?: string;
}

const LabStep: React.FC<LabStepProps> = ({
  step,
  index,
  copyToClipboard,
  caseStudy,
  isSecondStep,
  hierarchy,
  personaIntro,
}) => {
  const resolvedHierarchy = hierarchy ?? DEFAULT_HIERARCHY;
  const showUserStory = resolvedHierarchy.levels.includes("userStory");
  const showAC = resolvedHierarchy.levels.includes("acceptanceCriteria");
  const userStoryLabel = resolvedHierarchy.labels.userStory ?? "User Story";
  const acLabel = resolvedHierarchy.labels.acceptanceCriteria ?? "Acceptance Criteria";
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySummary = (text: string) => {
    copyToClipboard(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const getPrompt = () => {
    return step.prompt
      ?.replace("{{PERSONA_INTRO}}", personaIntro ?? "")
      ?.replace("{{CASE_STUDY_DATA}}", "") ?? null;
  };

  const prompt = getPrompt();

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-1 sm:gap-0">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800">
          {step.title}
        </h3>
        <div className="flex items-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm">
          <Clock size={14} className="sm:hidden" />
          <Clock size={16} className="hidden sm:block" />
          <span>{step.time} minutes</span>
        </div>
      </div>

      {step.setup && (
        <div className="mb-3 sm:mb-4">
          <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
            Setup
          </h4>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1">
            {step.setup.map((item, i) => (
              <li key={i} className="text-gray-600 text-xs sm:text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.guidelines && (
        <div className="mb-3 sm:mb-4">
          <h4 className="font-medium text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
            Guidelines
          </h4>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1">
            {step.guidelines.map((item, i) => (
              <li key={i} className="text-gray-600 text-xs sm:text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.details && (
        <div className="mb-3 sm:mb-4">
          {step.details.map((detail, i) => (
            <div key={i} className="mb-2 sm:mb-3">
              <h4 className="font-medium text-gray-700 mb-1 text-sm sm:text-base">
                {detail.heading}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-line">
                {detail.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {prompt && (
        <div className="mb-3 sm:mb-4">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <h4 className="font-medium text-gray-700 text-sm sm:text-base">
              {isSecondStep && caseStudy ? `${userStoryLabel} Teacher Prompt` : "Prompt"}
            </h4>
            <button
              onClick={() => handleCopy(prompt)}
              className="flex items-center gap-1 text-xs sm:text-sm transition-colors text-blue-500 hover:text-blue-600"
            >
              {copied ? (
                <>
                  <Check size={12} className="sm:hidden" />
                  <Check size={14} className="hidden sm:block" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={12} className="sm:hidden" />
                  <Copy size={14} className="hidden sm:block" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 p-2 sm:p-3 rounded-md text-xs sm:text-sm text-gray-700 whitespace-pre-line overflow-auto max-h-48 sm:max-h-64">
            {prompt}
          </div>
        </div>
      )}

      {isSecondStep && !caseStudy && (
        <div className="mt-3 sm:mt-4 bg-amber-50 border border-amber-200 rounded-md px-3 sm:px-4 py-3">
          <p className="text-xs sm:text-sm text-amber-800">
            {resolvedHierarchy.levels.length === 1
              ? "Select a problem above to unlock this step."
              : resolvedHierarchy.levels.length === 2
              ? `Select a problem and ${userStoryLabel.toLowerCase()} above to unlock this step.`
              : `Select a problem, ${userStoryLabel.toLowerCase()}, and ${acLabel.toLowerCase()} above to unlock this step.`}
          </p>
        </div>
      )}

      {isSecondStep && caseStudy && (
        <div className="mt-3 sm:mt-4 bg-blue-50 rounded-md overflow-hidden">
          <div className="flex justify-between items-center px-2 sm:px-3 pt-2 sm:pt-3 mb-2">
            <h4 className="font-medium text-gray-700 text-sm sm:text-base">Selected Context</h4>
            <button
              onClick={() => {
                const { problem, userStory, acceptanceCriteria } = caseStudy;
                const lines = [
                  `Problem Statement: ${problem.statement}`,
                  ...(problem.description ? [`Description: ${problem.description}`] : []),
                  ...(problem.context ? [`Context: ${problem.context}`] : []),
                  ...(problem.personas.length > 0
                    ? [`Personas:\n${problem.personas.map((p, i) => `${i + 1}. ${p.name} (${p.role}): ${p.description}`).join("\n")}`]
                    : []),
                  ...(userStory && showUserStory ? [`Selected ${userStoryLabel}: ${userStory.statement}`] : []),
                  ...(acceptanceCriteria.length > 0 && showAC
                    ? [`Selected ${acLabel}:\n${acceptanceCriteria.map((ac, i) => `${i + 1}. ${ac.criteria}`).join("\n")}`]
                    : []),
                ];
                handleCopySummary(lines.join("\n\n"));
              }}
              className="flex items-center gap-1 text-xs sm:text-sm transition-colors text-blue-500 hover:text-blue-600"
            >
              {copiedSummary ? (
                <>
                  <Check size={12} className="sm:hidden" />
                  <Check size={14} className="hidden sm:block" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={12} className="sm:hidden" />
                  <Copy size={14} className="hidden sm:block" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="px-2 sm:px-3 pb-2 sm:pb-3 space-y-2">
            <div>
              <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">Problem Statement:</p>
              <p className="text-xs sm:text-sm text-blue-800">{caseStudy.problem.statement}</p>
            </div>
            {caseStudy.problem.description && (
              <div>
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">Description:</p>
                <p className="text-xs sm:text-sm text-blue-800">{caseStudy.problem.description}</p>
              </div>
            )}
            {caseStudy.problem.context && (
              <div>
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">Context:</p>
                <p className="text-xs sm:text-sm text-blue-800">{caseStudy.problem.context}</p>
              </div>
            )}
            {caseStudy.problem.personas.length > 0 && (
              <div>
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">Personas:</p>
                <ul className="space-y-1">
                  {caseStudy.problem.personas.map((persona, i) => (
                    <li key={i} className="text-xs sm:text-sm text-blue-800">
                      <span className="font-medium">{persona.name}</span> ({persona.role}): {persona.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {caseStudy.userStory && showUserStory && (
              <div>
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">
                  Selected {userStoryLabel}:
                </p>
                <p className="text-xs sm:text-sm text-blue-800">{caseStudy.userStory.statement}</p>
              </div>
            )}
            {caseStudy.acceptanceCriteria.length > 0 && showAC && (
              <div>
                <p className="text-xs sm:text-sm text-blue-800 font-medium mb-0.5">Selected {acLabel}:</p>
                <ul className="space-y-0.5">
                  {caseStudy.acceptanceCriteria.map((ac, i) => (
                    <li key={i} className="text-xs sm:text-sm text-blue-800">{i + 1}. {ac.criteria}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabStep;
