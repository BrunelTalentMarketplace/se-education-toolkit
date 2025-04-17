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
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock size={16} />
          <span>{step.time} minutes</span>
        </div>
      </div>

      {step.setup && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Setup</h4>
          <ul className="list-disc pl-5 space-y-1">
            {step.setup.map((item, i) => (
              <li key={i} className="text-gray-600 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.guidelines && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Guidelines</h4>
          <ul className="list-disc pl-5 space-y-1">
            {step.guidelines.map((item, i) => (
              <li key={i} className="text-gray-600 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.details && (
        <div className="mb-4">
          {step.details.map((detail, i) => (
            <div key={i} className="mb-3">
              <h4 className="font-medium text-gray-700 mb-1">
                {detail.heading}
              </h4>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {detail.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {prompt && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">
              {isSecondStep && caseStudy
                ? `${caseStudy.name} Prompt`
                : "Prompt"}
            </h4>
            <button
              onClick={() => copyToClipboard(prompt)}
              className="flex items-center gap-1 text-[#FF9933] text-sm hover:text-[#E67300] transition-colors"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 whitespace-pre-line overflow-auto max-h-64">
            {prompt}
          </div>
        </div>
      )}

      {isSecondStep && caseStudy && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Case Study: </span>
            {caseStudy.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default LabStep;
