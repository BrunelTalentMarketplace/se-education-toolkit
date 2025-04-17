import { Lab, LabCategory, CaseStudy } from "@/data";

import { LABS } from "@/data";

export const getAreas = (): string[] => {
  return [...new Set(LABS.map((lab: LabCategory) => lab.area))];
};

export const formatTopicForDisplay = (topic: string): string => {
  return topic
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getTopics = (area: string): string[] => {
  if (!area) return [];
  return [
    ...new Set(
      LABS.filter((lab: LabCategory) => lab.area === area.toLowerCase()).map(
        (lab: LabCategory) => formatTopicForDisplay(lab.topic)
      )
    ),
  ];
};

export const getPersonas = (): string[] => {
  return [...new Set(LABS.map((lab: LabCategory) => lab.persona))];
};

export const getCaseStudies = (area: string, topic: string): CaseStudy[] => {
  if (!area || !topic) return [];

  const formattedTopic = topic.toLowerCase().replace(/ /g, "_");

  const matchingCategory = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() && lab.topic === formattedTopic
  );

  return matchingCategory ? matchingCategory.caseStudies : [];
};

export const formatTopicForQuery = (topic: string): string => {
  return topic.toLowerCase().replace(/ /g, "_");
};

export const filterLabs = (
  area: string,
  topic: string,
  persona: string,
  caseStudyId: string
): { labs: Lab[]; selectedCaseStudy: CaseStudy | null } => {
  const formattedTopic = formatTopicForQuery(topic);

  // Find the matching category
  const matchingCategory = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() &&
      lab.topic === formattedTopic &&
      lab.persona === persona.toLowerCase()
  );

  if (!matchingCategory) return { labs: [], selectedCaseStudy: null };

  // Find the selected case study
  const selectedCaseStudy =
    matchingCategory.caseStudies.find((study) => study.id === caseStudyId) ||
    null;

  // Clone the labs to avoid modifying the original data
  const labs = JSON.parse(JSON.stringify(matchingCategory.labs)) as Lab[];

  return { labs, selectedCaseStudy };
};
