import areasData from './lab-data.json';

// Types derived from JSON shape
export type Area = typeof areasData.areas[number]['name'];
export type Topic = typeof areasData.areas[number]['topics'][number];
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
  problemId?: string;
  statement: string;
  description?: string;
  acceptanceCriteria: AcceptanceCriteria[];
};

export type Problem = {
  id: string;
  statement: string;
  description: string;
  context?: string;
  personas: Persona[];
};

export type CaseStudy = {
  id: string;
  name: string;
  description: string;
  problem: Problem;
  userStories: UserStoryExample[];
};

export type LabCategory = {
  area: string;
  topic: string;
  persona: string;
  labs: Lab[];
  caseStudies: CaseStudy[];
};

// Internal type for the raw JSON shape of a case study definition
type CaseStudyDef = {
  id: string;
  name: string;
  description: string;
  topics: string[];
  problemId: string;
  userStoryIds: string[];
};

// Raw arrays loaded directly from JSON
export const GAMES: Lab[] = areasData.labs as Lab[];
export const PROBLEMS: Problem[] = areasData.problems as Problem[];
export const USER_STORIES: UserStoryExample[] = areasData.userStories as UserStoryExample[];
export const AREAS: Area[] = areasData.areas.map((a) => a.name);
export const PERSONAS: PersonaType[] = areasData.personas;

// Lookup helpers
export const getGameById = (id: string): Lab | undefined =>
  GAMES.find((g) => g.id === id);

export const getGameByFilters = (area: string, topic: string, persona: string): Lab[] =>
  GAMES.filter((g) => g.area === area && g.topic === topic && g.persona === persona);

export const getTopicsForArea = (area: Area): Topic[] =>
  areasData.areas.find((a) => a.name === area)?.topics ?? [];

export const getProblemById = (id: string): Problem | undefined =>
  PROBLEMS.find((p) => p.id === id);

export const getUserStoriesByIds = (ids: string[]): UserStoryExample[] =>
  USER_STORIES.filter((us) => ids.includes(us.id));

// Build CaseStudy objects from JSON definitions.
// Skips any entry whose problemId doesn't resolve, and warns rather than crashing.
const rawCaseStudies = areasData.caseStudies as CaseStudyDef[];

export const CASE_STUDIES: CaseStudy[] = rawCaseStudies.reduce<CaseStudy[]>((acc, def) => {
  const problem = PROBLEMS.find((p) => p.id === def.problemId);
  if (!problem) {
    console.warn(`CaseStudy "${def.id}": problem "${def.problemId}" not found — skipping.`);
    return acc;
  }
  acc.push({
    id: def.id,
    name: def.name,
    description: def.description,
    problem,
    userStories: getUserStoriesByIds(def.userStoryIds),
  });
  return acc;
}, []);

// Build LABS by deriving the topic → case study association from JSON.
// One LabCategory per (area, topic, persona) combination that has at least one game.
export const LABS: LabCategory[] = areasData.areas.flatMap((area) =>
  area.topics.flatMap((topic) => {
    const personas = [
      ...new Set(
        GAMES.filter((g) => g.area === area.name && g.topic === topic).map((g) => g.persona)
      ),
    ];
    if (personas.length === 0) return [];

    const caseStudies = CASE_STUDIES.filter((cs) =>
      rawCaseStudies.find((def) => def.id === cs.id)?.topics.includes(topic)
    );

    return personas.map((persona) => ({
      area: area.name,
      topic,
      persona,
      labs: getGameByFilters(area.name, topic, persona),
      caseStudies,
    }));
  })
);

export default { GAMES, CASE_STUDIES };
