import { Lab, LabCategory, Problem, PERSONAS } from "@/data";
import { LABS } from "@/data";

export const getAreas = (): string[] => {
  return [...new Set(LABS.map((lab: LabCategory) => lab.area.toLowerCase()))];
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
  return PERSONAS as string[];
};

export const getProblems = (area: string, topic: string): Problem[] => {
  if (!area || !topic) return [];
  const formattedTopic = topic.toLowerCase().replace(/ /g, "_");
  const match = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() && lab.topic === formattedTopic
  );
  return match ? match.problems : [];
};

export const formatTopicForQuery = (topic: string): string => {
  return topic.toLowerCase().replace(/ /g, "_");
};

export const filterLabs = (
  area: string,
  topic: string,
  problemId: string
): { labs: Lab[]; selectedProblem: Problem | null } => {
  const formattedTopic = formatTopicForQuery(topic);

  const matchingCategory = LABS.find(
    (lab: LabCategory) =>
      lab.area === area.toLowerCase() && lab.topic === formattedTopic
  );

  if (!matchingCategory) return { labs: [], selectedProblem: null };

  const selectedProblem =
    matchingCategory.problems.find((p) => p.id === problemId) ?? null;

  const labs = JSON.parse(JSON.stringify(matchingCategory.labs)) as Lab[];

  return { labs, selectedProblem };
};
