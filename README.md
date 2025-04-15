# Software Requirements Engineering Learning Platform

A Next.js-based educational platform designed to help users practice requirements engineering skills through interactive labs. The platform features guided exercises on user stories, use cases, and other requirements engineering concepts.

## Project Overview

This platform provides:

- Interactive labs with structured learning paths
- Different difficulty levels (easy, medium, hard)
- Role-based exercises (teacher, student, professional)
- Points-based feedback system
- Hint systems with progressive assistance

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
│   └── index.ts     # Main data structure for labs
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

2. Create a lab object:

```typescript
const my_new_lab_object: Lab = {
  id: "unique-lab-id",
  title: "Lab Title",
  description: "Brief description of the lab",
  steps: my_new_lab,
};
```

3. Add your lab to the LABS array:

```typescript
export const LABS: LabCategory[] = [
  // Existing categories
  {
    topic: "your_topic",
    persona: "your_persona",
    difficulty: "easy", // or "medium", "hard"
    labs: [my_new_lab_object],
  },
];
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

## License

[MIT](LICENSE)
