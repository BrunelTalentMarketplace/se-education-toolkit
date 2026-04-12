import gamesData from './games.json';
import areasData from './lab-data.json';

// Derive area type from JSON
export type Area = typeof areasData.areas[number]['name']; // Union of area names

// Derive topic type from JSON (all possible topics across areas)
export type Topic = typeof areasData.areas[number]['topics'][number]; // Union of all topics

// Derive persona type from JSON
export type PersonaType = typeof areasData.personas[number]; // Union of personas

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
  problemId?: string; // Added for linking to problems
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

// Load games from JSON
export const GAMES: Lab[] = gamesData.games as Lab[];

// Load problems from JSON
export const PROBLEMS: Problem[] = areasData.problems as Problem[];

// Load user stories from JSON
export const USER_STORIES: UserStoryExample[] = areasData.userStories as UserStoryExample[];

// Helper functions to fetch data dynamically
export const getGameByFilters = (
  area: string,
  topic: string,
  persona: string
): Lab[] => {
  return GAMES.filter(
    (game) =>
      game.area === area &&
      game.topic === topic &&
      game.persona === persona
  );
};

export const getGameById = (id: string): Lab | undefined => {
  return GAMES.find((game) => game.id === id);
};

// Helper to get topics for a specific area
export const getTopicsForArea = (area: Area): Topic[] => {
  const areaData = areasData.areas.find(a => a.name === area);
  return areaData ? areaData.topics : [];
};

// Helper to get a problem by ID
export const getProblemById = (id: string): Problem | undefined => {
  return PROBLEMS.find((problem) => problem.id === id);
};

// Helper to get user stories by IDs
export const getUserStoriesByIds = (ids: string[]): UserStoryExample[] => {
  return USER_STORIES.filter((us) => ids.includes(us.id));
};

// Case Studies (now using dynamic data)
const foodSharingCaseStudy: CaseStudy = {
  id: "food-sharing",
  name: "Food Sharing App",
  description: "An app that connects people in food poverty with allotment owners who have excess produce.",
  problem: getProblemById("food-sharing-problem")!,
  userStories: getUserStoriesByIds(["food-sharing-us-1"]),
};

const resetPasswordCaseStudy: CaseStudy = {
  id: "reset-password",
  name: "Reset Password",
  description: "A system to reset a user's password.",
  problem: getProblemById("reset-password-problem")!,
  userStories: getUserStoriesByIds(["reset-password-us-1"]),
};

const mentalHealthCaseStudy: CaseStudy = {
  id: "mental-health-assistance",
  name: "Mental Health Assistance App",
  description: "An app that tracks users' mood over time and provides personalised resources, peer group chat, and volunteer-led one-to-one support for young adults aged 18–24 who may not otherwise seek professional help.",
  problem: getProblemById("mental-health-problem")!,
  userStories: getUserStoriesByIds(["mental-health-us-1"]),
};

export type LabCategory = {
  area: string;
  topic: string;
  persona: string;
  labs: Lab[];
  caseStudies: CaseStudy[];
};

export const LABS: LabCategory[] = [
  {
    area: "requirements engineering",
    topic: "user_stories_and_acceptance_criteria",
    persona: "tutor",
    labs: getGameByFilters("requirements engineering", "user_stories_and_acceptance_criteria", "tutor"),
    caseStudies: [foodSharingCaseStudy, mentalHealthCaseStudy],
  },
  {
    area: "requirements engineering",
    topic: "use_cases",
    persona: "tutor",
    labs: getGameByFilters("requirements engineering", "use_cases", "tutor"),
    caseStudies: [resetPasswordCaseStudy],
  },
];

// Define CASE_STUDIES as an array
export const CASE_STUDIES: CaseStudy[] = [
  foodSharingCaseStudy,
  resetPasswordCaseStudy,
  mentalHealthCaseStudy,
];

export default { GAMES, CASE_STUDIES };

// Export areas for use elsewhere
export const AREAS: Area[] = areasData.areas.map(a => a.name);

// Export personas for use elsewhere
export const PERSONAS: PersonaType[] = areasData.personas;
