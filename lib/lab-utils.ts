import { Lab, LabCategory, CaseStudy } from "@/data";

import { LABS } from "@/data";

export const getAreas = (): string[] => {
  return [...new Set(LABS.map((lab: LabCategory) => lab.area))];
};

export const getTopics = (area: string): string[] => {
  if (!area) return [];
  return [
    ...new Set(
      LABS.filter((lab: LabCategory) => lab.area === area.toLowerCase()).map(
        (lab: LabCategory) => lab.topic.replace("_", " ")
      )
    ),
  ];
};

export const getPersonas = (): string[] => {
  return [...new Set(LABS.map((lab: LabCategory) => lab.persona))];
};

export const getCaseStudies = (area: string, topic: string): CaseStudy[] => {
  if (!area || !topic) return [];

  const formattedTopic = topic.replace(" ", "_").toLowerCase();

  const matchingCategory = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() && lab.topic === formattedTopic
  );

  return matchingCategory ? matchingCategory.caseStudies : [];
};

export const filterLabs = (
  area: string,
  topic: string,
  persona: string,
  caseStudyId: string
): Lab[] => {
  const formattedTopic = topic.replace(" ", "_").toLowerCase() as
    | "requirements_engineering"
    | "user_story"
    | "acceptance_criteria";

  // Find the matching category
  const matchingCategory = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() &&
      lab.topic === formattedTopic &&
      lab.persona === persona.toLowerCase()
  );

  if (!matchingCategory) return [];

  // Find the selected case study
  const selectedCaseStudy = matchingCategory.caseStudies.find(
    (study) => study.id === caseStudyId
  );

  // Clone the labs to avoid modifying the original data
  const labs = JSON.parse(JSON.stringify(matchingCategory.labs)) as Lab[];

  // Apply case study customizations to the second prompt if it exists
  labs.forEach((lab) => {
    if (lab.steps.length > 1 && lab.steps[1].prompt && selectedCaseStudy) {
      // If this is the food sharing case study (original data), keep it as is
      if (selectedCaseStudy.id === "food-sharing") {
        // Keep original content
      } else {
        // For other case studies, replace the content with case study-specific information
        const originalPrompt = lab.steps[1].prompt;

        // Replace the case study-specific part while preserving the rest of the prompt
        const promptStart = originalPrompt.split(
          "We will work on a problem based on"
        )[0];
        const promptAfterCaseStudy = originalPrompt.includes(
          "Here is a user story"
        )
          ? "Here is a user story" +
            originalPrompt.split("Here is a user story")[1]
          : "";

        lab.steps[1].prompt = `${promptStart}We will work on a problem based on ${selectedCaseStudy.name}.\n${selectedCaseStudy.description}\n\n${promptAfterCaseStudy}`;
      }
    }
  });

  return labs;
};
