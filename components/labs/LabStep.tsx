import { Copy, Clock } from "lucide-react";
import { Step } from "@/data/index";
import { Problem, UserStoryExample, AcceptanceCriteria } from "@/data";
import DATA from "@/data";

interface LabStepProps {
  step: Step;
  index: number;
  copyToClipboard: (text: string) => void;
  caseStudy?: {
    problem: Problem;
    userStory: UserStoryExample;
    acceptanceCriteria: AcceptanceCriteria[];
  } | null;
  isSecondStep?: boolean;
  topic?: string;
}

const LabStep: React.FC<LabStepProps> = ({
  step,
  index,
  copyToClipboard,
  caseStudy,
  isSecondStep,
  topic,
}) => {
  // Determine prompt source
  const getPrompt = () => {
    // If this is the second step and we have hierarchical case study data, use appropriate teacher
    if (isSecondStep && caseStudy && caseStudy.problem && caseStudy.userStory && caseStudy.acceptanceCriteria && caseStudy.acceptanceCriteria.length > 0 && topic) {
      const { problem, userStory, acceptanceCriteria } = caseStudy;

      // Select teacher based on topic
      let teacherData;
      let replacementText = "";

      if (topic === "user_stories_and_acceptance_criteria") {
        teacherData = DATA.user_story.teacher;
        replacementText = `Problem statement:
"${problem.statement}"

${problem.context ? `Context: ${problem.context}` : ''}

Personas:
${problem.personas.map((persona, i) => `${i + 1}. ${persona.name} (${persona.role}): ${persona.description}`).join('\n')}

Selected User Story:
"${userStory.statement}"

${userStory.description ? `Description: ${userStory.description}` : ''}

Selected Acceptance Criteria:
${acceptanceCriteria.map((ac, index) => `${index + 1}. ${ac.criteria}`).join('\n')}

Start by welcoming me to the User Story Wizard Game! Ask to enter a problem statement, proposed solution, personas and at least one user story with its acceptance criteria.`;
      } else if (topic === "use_cases") {
        teacherData = DATA.requirements_engineering.teacher;
        replacementText = `Problem statement:
"${problem.statement}"

${problem.context ? `Context: ${problem.context}` : ''}

Personas:
${problem.personas.map((persona, i) => `${i + 1}. ${persona.name} (${persona.role}): ${persona.description}`).join('\n')}

Selected Use Case Scenario:
"${userStory.statement}"

${userStory.description ? `Description: ${userStory.description}` : ''}

Selected Acceptance Criteria:
${acceptanceCriteria.map((ac, index) => `${index + 1}. ${ac.criteria}`).join('\n')}

Start by welcoming me to the Use Case Detective Game!`;
      }

      if (teacherData && teacherData.prompt) {
        // Replace the ending of the teacher prompt with selected data
        const endingPattern = topic === "user_stories_and_acceptance_criteria"
          ? /Start by welcoming me to the User Story Wizard Game! Ask to enter a problem statement, proposed solution, personas and at least one user story with its acceptance criteria\./
          : /Start by welcoming me to the Use Case Detective Game!/;

        return teacherData.prompt.replace(endingPattern, replacementText);
      }
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
                ? `${topic === "user_stories_and_acceptance_criteria" ? "User Story" : "Requirements Engineering"} Teacher Prompt`
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
          <p className="text-xs sm:text-sm text-blue-800 mb-2">
            <span className="font-medium">Selected Problem: </span>
            {caseStudy.problem.statement}
          </p>
          <p className="text-xs sm:text-sm text-blue-800 mb-2">
            <span className="font-medium">Selected {topic === "use_cases" ? "Use Case Scenario" : "User Story"}: </span>
            {caseStudy.userStory.statement}
          </p>
          <p className="text-xs sm:text-sm text-blue-800">
            <span className="font-medium">Selected Acceptance Criteria: </span>
            {caseStudy.acceptanceCriteria.map((ac, index) => 
              `${index + 1}. ${ac.criteria}${index < caseStudy.acceptanceCriteria.length - 1 ? '; ' : ''}`
            ).join('')}
          </p>
          <p className="text-xs sm:text-sm text-blue-800 mt-2">
            <span className="font-medium">Teacher: </span>
            {topic === "user_stories_and_acceptance_criteria" ? "User Story Teacher" : "Requirements Engineering Teacher"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LabStep;
