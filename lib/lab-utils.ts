import { Lab } from "@/data";

import { LABS } from "@/data";

export const getTopics = (): string[] => {
  return [...new Set(LABS.map((lab) => lab.topic.replace("_", " ")))];
};

export const getPersonas = (): string[] => {
  return [...new Set(LABS.map((lab) => lab.persona))];
};

export const getDifficulties = (): string[] => {
  return [...new Set(LABS.map((lab) => lab.difficulty))];
};

export const filterLabs = (
  topic: string,
  persona: string,
  difficulty: string
): Lab[] => {
  const formattedTopic = topic.replace(" ", "_").toLowerCase() as
    | "requirements_engineering"
    | "user_story";

  const filtered = LABS.filter(
    (lab) =>
      lab.topic === formattedTopic &&
      lab.persona === persona.toLowerCase() &&
      lab.difficulty === difficulty.toLowerCase()
  );

  return filtered.flatMap((category) => category.labs);
};
