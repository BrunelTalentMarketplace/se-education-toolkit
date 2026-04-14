import { Lab, AcceptanceCriteria, Problem, UserStoryExample } from "@/data";

export type CaseStudyData = {
  problem: Problem;
  userStory: UserStoryExample;
  acceptanceCriteria: AcceptanceCriteria[];
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const CSS = `
  body { font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
  .container { background: white; padding: 2rem; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  .header { background: #2c3e50; color: white; padding: 1rem; border-radius: 2px; margin-bottom: 1rem; }
  .section { background: #fff; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid #3498db; border-radius: 0 8px 8px 0; }
  .code-block { background: #f8f9fa; padding: 1rem; border-radius: 6px; font-family: monospace; border: 1px solid #dee2e6; white-space: pre-wrap; margin: 1rem 0; }
  .timer { display: inline-block; background: #e74c3c; color: white; padding: 0.3rem 0.8rem; border-radius: 4px; font-weight: bold; }
  h1, h2, h3 { color: #2c3e50; }
  ul, ol { padding-left: 1.5rem; }
  li { margin-bottom: 0.5rem; }
  .prompt-container { font-family: 'Segoe UI', system-ui, sans-serif; line-height: 1.6; margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6; }
  .copy-button { background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-bottom: 10px; }
  .copy-button:hover { background: #0056b3; }
  pre { white-space: pre-wrap; word-wrap: break-word; margin: 0; font-family: inherit; }
`;

export const downloadLabSheet = (
  lab: Lab,
  personaIntro: string | null,
  caseStudy: CaseStudyData | null,
  topic: string
) => {
  let sectionsHTML = "";

  lab.steps.forEach((step) => {
    const isInteraction = step.type === "interaction";

    const setupHTML = step.setup
      ? `<ol>${step.setup.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`
      : "";

    const promptText =
      step.prompt
        ?.replace("{{PERSONA_INTRO}}", personaIntro ?? "")
        ?.replace("{{CASE_STUDY_DATA}}", "") ?? null;
    const promptHTML = promptText
      ? `<div class="prompt-container">
          <button class="copy-button" onclick="copyPrompt(this)">Copy Prompt</button>
          <pre>${escapeHtml(promptText)}</pre>
        </div>`
      : "";

    let caseStudyHTML = "";
    if (isInteraction && caseStudy) {
      const { problem, userStory, acceptanceCriteria } = caseStudy;
      const userStoryLabel = topic === "use_cases" ? "Use Case Scenario" : "User Story";
      const caseStudyText = [
        `Problem Statement: ${problem.statement}`,
        ...(problem.description ? [`Description: ${problem.description}`] : []),
        ...(problem.context ? [`Context: ${problem.context}`] : []),
        `Personas:\n${problem.personas.map((p, i) => `${i + 1}. ${p.name} (${p.role}): ${p.description}`).join("\n")}`,
        `Selected ${userStoryLabel}: ${userStory.statement}`,
        ...(userStory.description ? [`Description: ${userStory.description}`] : []),
        `Selected Acceptance Criteria:\n${acceptanceCriteria.map((ac, i) => `${i + 1}. ${ac.criteria}`).join("\n")}`,
      ].join("\n\n");
      caseStudyHTML = `<p>Provide this information for analysis:</p>
        <div class="prompt-container">
          <button class="copy-button" onclick="copyPrompt(this)">Copy Prompt</button>
          <pre>${escapeHtml(caseStudyText)}</pre>
        </div>`;
    }

    const guidelinesHTML = step.guidelines
      ? `<h3>Guidelines:</h3><ul>${step.guidelines.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ul>`
      : "";

    sectionsHTML += `<div class="section">
      <h2>${escapeHtml(step.title)} <span class="timer">${step.time} minutes</span></h2>
      ${setupHTML}${promptHTML}${caseStudyHTML}${guidelinesHTML}
    </div>`;
  });

  sectionsHTML += `<div class="section">
    <h2>Documentation <span class="timer">5 minutes</span></h2>
    <ol>
      <li>Export your conversation (or copy and paste your interactions into a text document)</li>
      <li>Save as PDF/text</li>
    </ol>
  </div>`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${CSS}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="header">${escapeHtml(lab.title)}</h1>
      <h2 class="header">LLM-assisted Learning Exercise</h2>
    </div>
    ${sectionsHTML}
  </div>
  <script>
    function copyPrompt(button) {
      const pre = button.nextElementSibling;
      navigator.clipboard.writeText(pre.innerText).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => { button.textContent = 'Copy Prompt'; }, 2000);
      });
    }
  </script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${lab.title.replace(/\s+/g, "-").toLowerCase()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
