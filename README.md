# Software Requirements Engineering Learning Platform

A Next.js-based educational platform designed to help users practice requirements engineering skills through interactive labs. The platform features guided exercises on user stories, use cases, and other requirements engineering concepts.

## Project Overview

This platform provides:

- Interactive labs with structured learning paths
- Different software development areas (requirements engineering, coding maintainers)
- Various topics per area (user stories, requirements engineering, etc.)
- Role-based exercises (teacher, student, professional)
- Configurable case studies for contextual learning
- Points-based feedback system
- Hint systems with progressive assistance
- Downloadable lab sheets for offline use

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/sse-site.git
cd sse-site
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── app/             # Next.js application routes and components
├── components/      # Reusable UI components
├── data/            # Lab content and configuration
│   ├── index.ts     # Main data structure for labs
│   └── lab-sheets/  # Downloadable HTML lab sheets
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # CSS and styling
```

## Creating a New Lab

Labs are defined in `data/index.ts` following a structured format:

1. Create a new lab array with steps:

```typescript
const my_new_lab = [
  {
    title: "Part 1: Setup",
    time: 5,
    setup: ["Step 1", "Step 2"],
    prompt: `Your detailed prompt here...`,
  },
  {
    title: "Part 2: Game Interaction",
    time: 15,
    guidelines: ["Guideline 1", "Guideline 2"],
    details: [
      {
        heading: "Section heading",
        content: "Content details...",
      },
    ],
    prompt: `Your detailed prompt here...`,
  },
  // Add more steps as needed
];
```

2. Create case studies for your lab:

```typescript
const myCaseStudy: CaseStudy = {
  id: "unique-case-study-id",
  name: "Case Study Display Name",
  description: "Brief description of the case study scenario",
};
```

3. Create a lab object:

```typescript
const my_new_lab_object: Lab = {
  id: "unique-lab-id",
  title: "Lab Title",
  description: "Brief description of the lab",
  steps: my_new_lab,
  downloadFile: "/files/lab-sheets/YourLabName.html", // Optional HTML lab sheet
};
```

4. Add your lab to the LABS array with appropriate area, topic, and case studies:

```typescript
export const LABS: LabCategory[] = [
  // Existing categories
  {
    area: "requirements engineering", // or "coding maintainers", etc.
    topic: "your_topic", // e.g., "user_story", "requirements_engineering"
    persona: "your_persona", // e.g., "teacher", "student", "professional"
    labs: [my_new_lab_object],
    caseStudies: [myCaseStudy, anotherCaseStudy],
  },
];
```

5. (Optional) Create and add a downloadable HTML lab sheet in the data/lab-sheets directory.

## Case Study Configuration

Case studies provide context for labs and determine how the second prompt is rendered:

1. Create case studies with unique IDs, display names, and descriptions
2. Assign case studies to lab categories (area/topic combinations)
3. The platform will automatically update lab prompts based on the selected case study

For example:

```typescript
// Define case studies
const healthcareCaseStudy: CaseStudy = {
  id: "healthcare",
  name: "Healthcare App",
  description: "A patient management system for healthcare providers."
};

// Assign to a lab category
{
  area: "requirements engineering",
  topic: "user_story",
  persona: "professional",
  labs: [my_professional_lab],
  caseStudies: [healthcareCaseStudy, ecommerceCaseStudy]
}
```

## Development Workflow

### Git Best Practices

1. Create a new branch for each feature or fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-you-are-fixing
```

2. Make your changes and commit with descriptive messages:

```bash
git add .
git commit -m "feat: add new user story lab for professionals"
```

3. Push your branch and create a pull request:

```bash
git push origin feature/your-feature-name
```

4. In your GitHub repository, create a pull request with:

   - Clear title describing the change
   - Description of what was changed and why
   - Any testing performed
   - Reference to related issues (if applicable)

5. After review and approval, merge your PR into the main branch

### Code Style

- Follow existing patterns and conventions in the codebase
- Keep lab content structured and consistent with existing examples
- Use TypeScript types for all new code

## Deployment

The application can be deployed to Vercel:

```bash
npm run build
# or
vercel
```
