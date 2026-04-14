import areasData from './lab-data.json';
import { PROMPTS } from './prompts';

// Types derived from JSON shape
export type Area = typeof areasData.areas[number]['name'];
export type Topic = typeof areasData.areas[number]['topics'][number]['name'];
export type PersonaType = typeof areasData.personas[number]['id'];

export type Step = {
  type?: "setup" | "interaction";
  title: string;
  time: number;
  setup?: string[];
  guidelines?: string[];
  details?: Array<{ heading: string; content: string }>;
  prompt?: string | null;
};

export type Lab = {
  id: string;
  area: Area;
  topic: Topic;
  title: string;
  description?: string;
  steps: Step[];
};

export type Persona = {
  name: string;
  role: string;
  description: string;
};

export type AcceptanceCriteria = {
  id: string;
  criteria: string;
};

export type UserStoryExample = {
  id: string;
  statement: string;
  description?: string;
  acceptanceCriteria: AcceptanceCriteria[];
};

export type Problem = {
  id: string;
  name: string;
  statement: string;
  description: string;
  context?: string;
  personas: Persona[];
  userStories: UserStoryExample[];
};

export type LabCategory = {
  area: string;
  topic: string;
  labs: Lab[];
  problems: Problem[];
};

export type PersonaOption = {
  id: string;
  label: string;
};

// Build flat GAMES array by injecting area and topic from the nested structure
export const GAMES: Lab[] = areasData.areas.flatMap((area) =>
  area.topics.flatMap((topic) =>
    topic.games.map((game) => ({
      ...game,
      area: area.name as Area,
      topic: topic.name as Topic,
      steps: game.steps.map((step) => {
        const { promptFile, ...rest } = step as typeof step & { promptFile?: string };
        const prompt: string | null = promptFile
          ? (PROMPTS[promptFile] ?? null)
          : (('prompt' in rest ? rest.prompt : null) as string | null);
        return { ...rest, prompt, type: rest.type as Step["type"] };
      }),
    }))
  )
);

export const PROBLEMS: Problem[] = areasData.problems as Problem[];
export const USER_STORIES: UserStoryExample[] = PROBLEMS.flatMap((p) => p.userStories);

// Lookup helpers
export const getGameById = (id: string): Lab | undefined =>
  GAMES.find((g) => g.id === id);

export const getGameByFilters = (area: string, topic: string): Lab[] =>
  GAMES.filter((g) => g.area === area && g.topic === topic);

export const getTopicsForArea = (area: Area): Topic[] =>
  areasData.areas.find((a) => a.name === area)?.topics.map((t) => t.name as Topic) ?? [];

export const getProblemById = (id: string): Problem | undefined =>
  PROBLEMS.find((p) => p.id === id);

export const getPersonaIntro = (area: string, persona: string): string | null => {
  const areaData = areasData.areas.find((a) => a.name === area);
  if (!areaData) return null;
  return (areaData.personaIntros as Record<string, string>)[persona] ?? null;
};

// One LabCategory per (area, topic) that has at least one game
export const LABS: LabCategory[] = areasData.areas.flatMap((area) =>
  area.topics.flatMap((topic) => {
    const labs = getGameByFilters(area.name, topic.name);
    if (labs.length === 0) return [];

    const problems = topic.problemIds
      .map((id) => {
        const p = PROBLEMS.find((p) => p.id === id);
        if (!p) console.warn(`Topic "${topic.name}" references unknown problem id "${id}"`);
        return p;
      })
      .filter((p): p is Problem => p !== undefined);

    return [{ area: area.name, topic: topic.name, labs, problems }];
  })
);

// Dev-time validation: warn if personaIntros keys don't match known persona ids
if (process.env.NODE_ENV !== 'production') {
  const personaIds = new Set(areasData.personas.map((p) => p.id));
  areasData.areas.forEach((area) => {
    Object.keys(area.personaIntros).forEach((key) => {
      if (!personaIds.has(key)) {
        console.warn(`Area "${area.name}" personaIntros references unknown persona id "${key}"`);
      }
    });
  });
}

export const AREAS: Area[] = areasData.areas.map((a) => a.name);
export const PERSONAS: PersonaOption[] = areasData.personas;

export default { GAMES };
