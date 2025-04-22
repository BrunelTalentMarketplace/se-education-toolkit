import { Copy, Clock } from "lucide-react";
import { Step } from "@/data/index";
import { CaseStudy } from "@/data";

interface LabStepProps {
  step: Step;
  index: number;
  copyToClipboard: (text: string) => void;
  caseStudy?: CaseStudy | null;
  isSecondStep?: boolean;
}

const LabStep: React.FC<LabStepProps> = ({
  step,
  index,
  copyToClipboard,
  caseStudy,
  isSecondStep,
}) => {
  // Determine prompt source
  const getPrompt = () => {
    // If this is the second step and we have a case study, use the case study prompt
    if (isSecondStep && caseStudy) {
      return caseStudy.prompt;
    }
    // Otherwise use the step prompt if it exists
    return step.prompt;
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
              {isSecondStep && caseStudy
                ? `${caseStudy.name} Prompt`
                : "Prompt"}
            </h4>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="flex items-center gap-1 text-blue-500 text-xs sm:text-sm hover:text-blue-600 transition-colors"
            >
              <Copy size={12} className="sm:hidden" />
              <Copy size={14} className="hidden sm:block" />
              Copy
            </button>
          </div>
          <div className="bg-gray-50 p-2 sm:p-3 rounded-md text-xs sm:text-sm text-gray-700 whitespace-pre-line overflow-auto max-h-48 sm:max-h-64">
            {prompt}
          </div>
        </div>
      )}

      {isSecondStep && caseStudy && (
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-md">
          <p className="text-xs sm:text-sm text-blue-800">
            <span className="font-medium">Case Study: </span>
            {caseStudy.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default LabStep;
