import userStoryTutor from "./user-story-tutor";
import useCaseTutor from "./use-case-tutor";
import redOrGreen from "./red-or-green";
import writeTheTestFirst from "./write-the-test-first";
import fixTheDesign from "./fix-the-design";
import solidViolations from "./solid-violations";
import sequenceDiagramRepair from "./sequence-diagram-repair";

export const PROMPTS: Record<string, string> = {
  "user-story-tutor": userStoryTutor,
  "use-case-tutor": useCaseTutor,
  "red-or-green": redOrGreen,
  "write-the-test-first": writeTheTestFirst,
  "fix-the-design": fixTheDesign,
  "solid-violations": solidViolations,
  "sequence-diagram-repair": sequenceDiagramRepair,
};
