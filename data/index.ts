const user_story_teacher = [
  {
    title: "Part 1: Setup",
    time: 5,
    setup: [
      "Open your preferred LLM assistant",
      "Copy and paste the following prompt:",
    ],
    prompt: `
                 I want you to act as a Requirements Engineering teacher who will help me practice writing functional requirements. You will help me create an Agile user story based on a problem statement, proposed solution and personas.  A user story is an informal, general explanation of a software feature written from the perspective of the end user. Its purpose is to articulate how a software feature will provide value to the customer.  The user story we will work on will represent a functional requirement that specifies what the product, system, or service should do or provide. 
                User stories are often expressed in a simple sentence, structured as follows:
                "As a [persona], I [want to], [so that]."
                The user stories should have:
                1.	The user story statement: "As a [persona], I [want to], [so that]."
                2.	Its acceptance criteria, which may be incomplete.
                The acceptance criteria follow the "Given-When-Then", defining the context ("Given"), the action/event ("When"), and the expected outcome ("Then") for a user story or feature. 
                A user story should satisfy INVEST. This stands for:
                •	Independent: The user story should be independent of all others. Because they are not connected, they can be worked on in any order.
                •	Negotiable: A user story should be flexible enough to encourage and allow for negotiation between the customer and product owner.
                •	Valuable: What value does the user story bring? If you cannot find any value or desired functionality, the story should not be completed.
                •	Estimable: You should be able to make an estimation of how long a user story will take so that you can effectively manage your time.
                •	Small: The story must be small enough to be completed within a single sprint.
                •	Testable: You must be able to test your user story in line with quality assurance standards and obtain confirmation through acceptance testing (e.g., beta testing).
                Points System:
                - Suggesting a new user story that is missing: +10 points
                - Finding an issue in the user story without hints: +5 points
                - Fixing an issue with an existing user story: +5 points
                - Suggesting acceptance criteria: +5 points
                - Fixing acceptance criteria: +5 points
                - Creative solutions that enhance a user story: +5 points
                Hint System:
                I can request hints at three levels:
                - Level 1: Reminder of criteria for good user stories or the format of user stories and acceptance criteria (-0 points)
                - Level 2: Hints about what's wrong in the user story or its acceptance criteria (-5 points)
                - Level 3: Exact issue and how to fix it (-10 points)
                For each step, check the following but do not show fixes for identified issues:
                1. Is the user story clear and specific?
                2. Is it at the right detail level? Does the statement represent a single user story or an epic that combines multiple user stories?
                3. Are Acceptance Criteria specified?
                4. Is the requirement consistent with the overall objective specified for the system/product?
                5. Is the requirement necessary, or does it represent an add-on feature that may not be essentially implemented?
                6. Is testing possible once the requirement is implemented?
                7. Is the requirement feasible in the technical environment where the product or system will be used?
                After EVERY interaction, you must show:
                1. The current USER STORY with its current acceptance criteria.
                2. STATUS (Score, Current Step, Issues Found, Issues Fixed, Steps Left)
                3. SUGGESTED NEXT ACTIONS to revise the user story and add or revise acceptance criteria
                Start by welcoming me to the User Story Wizard Game! Ask to enter a problem statement, proposed solution, personas and at least one user story with its acceptance criteria.
                `,
  },
  {
    title: "Part 2: Game Interaction",
    time: 10,
    guidelines: [
      "Analyze each step carefully",
      "Try finding issues before requesting hints",
      "Progress through hint levels only when needed",
      "Track your score",
      "Document learned principles",
    ],
    prompt: `
                We will work on a problem based on UN SDG #2 (Zero Hunger). 
                Problem statement:
                "People in food poverty need access to fresh food in a way that preserves their dignity and avoids excessive bureaucracy."
                Our primary users are those in food poverty but want to access healthy food without putting their dignity at stake. They require less cumbersome ways to get healthy produce. 
                As a solution, we want to develop an app that helps people locate fresh produce in their area more easily. In our solution, allotment owners can advertise their excess produce and when and how it can be picked up.  Registered users can browse and check out the produce they like. 
                We have two personas. 
                Sarah is a young mother of two who has recently lost her job. She believes buying frozen or fast food is not a matter of ignorance but of being unable to afford "healthy food". She doesn't want to use a food bank because she doesn't want to be seen asking for help.  We will call her our Allotment User.
                Benjamin has owned an allotment for years, and he has been overproducing. He wants to transform part of his allotment to provide those on benefits, pensioners on state pension and those on a low-income free organic fruit and vegetables. But he doesn't know how to reach those people. We will call him the Allotment Owner.
                Here is a user story for Allotment User:
                As an allotment user, I want to create an app account so that I can save my preferences. 
                Acceptance criteria:
                Given that the user is on the register page, when the user enters email, password, types of fresh food, and locations to pick up the food from, the user should be registered and directed to the login page. 
                Given that the user entered a password that doesn't meet password requirements, when the registration button is clicked, the error message "invalid password" is displayed.
                Given that the user entered an invalid email, when the registration button is clicked, the error message "invalid email" is displayed. 
`,
  },
  {
    title: "Part 3: Documentation",
    time: 5,
    setup: [
      "Export your conversation (or simply copy paste your interactions in a text document)",
      "Save as PDF/text",
      "Submit your LLM thread and complete the survey here: Post-survey form",
      "Thank you! You are awesome!",
    ],
    prompt: null,
  },
];

const requirements_engineering_teacher = [
  {
    title: "Part 1: Setup",
    time: 5,
    setup: [
      "Open your preferred LLM assistant",
      "Copy and paste the following prompt:",
    ],
    prompt: `
        I want you to act as an expert Requirements Engineering teacher helping me analyze the main flow of use cases.

        Points System:
        - Finding an issue without hints: +15 points
        - Successfully fixing an issue: +10 points
        - Implementing a best practice improvement: +5 points
        - Creative solutions that enhance the use case: +5 points

        Hint System:
        I can request hints at three levels:
        - Level 1: Reminder of good main flow criteria (-0 points)
        - Level 2: Identification of what's wrong in current step (-5 points)
        - Level 3: Exact issue and how to fix it (-10 points)

        For each step, check:
        1. Is it clear and specific?
        2. Is it a single action?
        3. Does it show both actor and system responses?
        4. Are UI elements specified?
        5. Is it at the right detail level?
        6. Is it in logical sequence?

        After EVERY interaction, you must show:
        1. CURRENT USE CASE MAIN FLOW
        2. CURRENT STEP BEING ANALYZED
        3. STATUS (Score, Current Step, Issues Found, Issues Fixed, Steps Left)
        4. SUGGESTED NEXT ACTIONS
        5. FEEDBACK

        Start by welcoming me to the Use Case Detective Game!
    `,
  },
  {
    title: "Part 2: Game Interaction",
    time: 15,
    guidelines: [
      "Analyze each step carefull",
      "Try finding issues before requesting hints",
      "Progress through hint levels only when needed",
      "Track your score",
      "Document learned principles",
    ],
    details: [
      {
        heading: "Provide this use case for analysis",
        content: `
    1. User clicks reset password 
    2. System sends them the link 
    3. User enters new password 
    4. System updates the account,
    `,
      },
    ],
    prompt: null,
  },
  {
    title: "Part 3: Documentation",
    time: 5,
    setup: [
      "Export your conversation",
      "Save as PDF/text",
      "Submit your LLM thread and complete the survey here: https://forms.office.com/e/k7CswSJKeZ",
      "Thank you! You are awesome!",
    ],
    prompt: null,
  },
];

const DATA = {
  user_story: {
    teacher: user_story_teacher,
  },
  requirements_engineering: {
    teacher: requirements_engineering_teacher,
  },
};

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
  title: string;
  description?: string;
  steps: Step[];
  downloadFile?: string;
};

export type CaseStudy = {
  id: string;
  name: string;
  description: string;
  prompt: string;
};

export type LabCategory = {
  area: "requirements engineering" | "coding maintainers";
  topic: "user_stories_and_acceptance_criteria" | "use_cases";
  persona: "tutor" | "student" | "professional";
  labs: Lab[];
  caseStudies: CaseStudy[];
};

const user_story_tutor_lab: Lab = {
  id: "user-story-tutor",
  title: "User Story Writing Practice",
  description: "Learn to write effective user stories with guided feedback",
  steps: user_story_teacher,
  downloadFile: "/files/lab-sheets/User-Story-teacher-beginner.html",
};

const requirements_engineering_tutor_lab: Lab = {
  id: "requirements-engineering-tutor",
  title: "Use Case Analysis Practice",
  description: "Learn to analyze and improve use case flows",
  steps: requirements_engineering_teacher,
  downloadFile: "/files/lab-sheets/ReqEngineering-teacher-beginner.html",
};

// Case Studies
const foodSharingCaseStudy: CaseStudy = {
  id: "food-sharing",
  name: "Food Sharing App",
  description:
    "An app that connects people in food poverty with allotment owners who have excess produce.",
  prompt: `
    We will work on a problem based on UN SDG #2 (Zero Hunger). 
    Problem statement:
    "People in food poverty need access to fresh food in a way that preserves their dignity and avoids excessive bureaucracy."
    Our primary users are those in food poverty but want to access healthy food without putting their dignity at stake. They require less cumbersome ways to get healthy produce. 
    As a solution, we want to develop an app that helps people locate fresh produce in their area more easily. In our solution, allotment owners can advertise their excess produce and when and how it can be picked up.  Registered users can browse and check out the produce they like. 
    We have two personas. 
    Sarah is a young mother of two who has recently lost her job. She believes buying frozen or fast food is not a matter of ignorance but of being unable to afford "healthy food". She doesn't want to use a food bank because she doesn't want to be seen asking for help.  We will call her our Allotment User.
    Benjamin has owned an allotment for years, and he has been overproducing. He wants to transform part of his allotment to provide those on benefits, pensioners on state pension and those on a low-income free organic fruit and vegetables. But he doesn't know how to reach those people. We will call him the Allotment Owner.
    Here is a user story for Allotment User:
    As an allotment user, I want to create an app account so that I can save my preferences. 
    Acceptance criteria:
    Given that the user is on the register page, when the user enters email, password, types of fresh food, and locations to pick up the food from, the user should be registered and directed to the login page. 
    Given that the user entered a password that doesn't meet password requirements, when the registration button is clicked, the error message "invalid password" is displayed.
    Given that the user entered an invalid email, when the registration button is clicked, the error message "invalid email" is displayed.
  `,
};

const resetPasswordCaseStudy: CaseStudy = {
  id: "reset-password",
  name: "Reset Password",
  description: "A system to reset a user's password.",
  prompt: `
    1. User clicks reset password 
    2. System sends them the link 
    3. User enters new password 
    4. System updates the account,
  `,
};

export const LABS: LabCategory[] = [
  {
    area: "requirements engineering",
    topic: "user_stories_and_acceptance_criteria",
    persona: "tutor",
    labs: [user_story_tutor_lab],
    caseStudies: [foodSharingCaseStudy],
  },
  {
    area: "requirements engineering",
    topic: "use_cases",
    persona: "tutor",
    labs: [requirements_engineering_tutor_lab],
    caseStudies: [resetPasswordCaseStudy],
  },
];

export default DATA;
