import areasData from './lab-data.json';
import { PROMPTS } from './prompts';

// Types derived from JSON shape
export type Area = typeof areasData.areas[number]['name'];
export type Topic = typeof areasData.areas[number]['topics'][number]['name'];
export type PersonaType = typeof areasData.personas[number];

export type Step = {
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
  persona: PersonaType;
  title: string;
  description?: string;
  steps: Step[];
  downloadFile?: string;
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
  persona: string;
  labs: Lab[];
  problems: Problem[];
};

// Build flat GAMES array by injecting area and topic from the nested structure
export const GAMES: Lab[] = areasData.areas.flatMap((area) =>
  area.topics.flatMap((topic) =>
    topic.games.map((lab) => ({
      ...lab,
      area: area.name as Area,
      topic: topic.name as Topic,
      steps: lab.steps.map((step) => {
        const { promptFile, ...rest } = step as typeof step & { promptFile?: string };
        const prompt: string | null = promptFile
          ? (PROMPTS[promptFile] ?? null)
          : (('prompt' in rest ? rest.prompt : null) as string | null);
        return { ...rest, prompt };
      }),
    }))
  )
);

export const PROBLEMS: Problem[] = areasData.problems as Problem[];
export const USER_STORIES: UserStoryExample[] = PROBLEMS.flatMap((p) => p.userStories);

// Lookup helpers
export const getGameById = (id: string): Lab | undefined =>
  GAMES.find((g) => g.id === id);

export const getGameByFilters = (area: string, topic: string, persona: string): Lab[] =>
  GAMES.filter((g) => g.area === area && g.topic === topic && g.persona === persona);

export const getTopicsForArea = (area: Area): Topic[] =>
  areasData.areas.find((a) => a.name === area)?.topics.map((t) => t.name as Topic) ?? [];

export const getProblemById = (id: string): Problem | undefined =>
  PROBLEMS.find((p) => p.id === id);

// Build LABS by deriving the topic → problem association from each problem's topics field.
// One LabCategory per (area, topic, persona) combination that has at least one game.
export const LABS: LabCategory[] = areasData.areas.flatMap((area) =>
  area.topics.flatMap((topic) => {
    const personas = [
      ...new Set(
        GAMES.filter((g) => g.area === area.name && g.topic === topic.name).map((g) => g.persona)
      ),
    ];
    if (personas.length === 0) return [];

    const problems = topic.problemIds
      .map((id) => {
        const p = PROBLEMS.find((p) => p.id === id);
        if (!p) console.warn(`Topic "${topic.name}" references unknown problem id "${id}"`);
        return p;
      })
      .filter((p): p is Problem => p !== undefined);

    return personas.map((persona) => ({
      area: area.name,
      topic: topic.name,
      persona,
      labs: getGameByFilters(area.name, topic.name, persona),
      problems,
    }));
  })
);

export const AREAS: Area[] = areasData.areas.map((a) => a.name);
export const PERSONAS: PersonaType[] = areasData.personas;

export default { GAMES };
