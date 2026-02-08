const CONTENT_REGISTRY = {
  researchProjects: [
    { id: "research", label: "Research projects", anchor: "#research" },
    {
      id: "hepnovate-overview",
      label: "Hepnovate — Overview",
      anchor: "#research",
    },
    {
      id: "hepnovate-problem",
      label: "Hepnovate — Problem Motivation",
      anchor: "#research",
    },
    {
      id: "data-driven-active-snakes",
      label: "Data-Driven Active Snakes",
      anchor: "#research",
    },
    {
      id: "ot-strap-robot-learning",
      label: "OT-Strap: Robot Learning",
      anchor: "#research",
    },
    {
      id: "llm-hallucination-mitigation",
      label: "LLM Hallucination Mitigation",
      anchor: "#research",
    },
    {
      id: "interpra-interpretability-dashboard",
      label: "InterPra: Interpretability Dashboard",
      anchor: "#research",
    },
    {
      id: "era-5-air-quality-dataset",
      label: "ERA-5 Air Quality Dataset",
      anchor: "#research",
    },
    {
      id: "docu-tally-semantic-search",
      label: "Docu-Tally: Semantic Search",
      anchor: "#research",
    },
    {
      id: "biomedical-ai-survey",
      label: "Biomedical AI Survey",
      anchor: "#research",
    },
  ],
  workExperience: [
    { id: "experience", label: "Work experience", anchor: "#experience" },
    {
      id: "rfa-electric",
      label: "RFA Electric (AI/ML Intern)",
      anchor: "#experience",
    },
    {
      id: "resume-experience-rfa",
      label: "RFA Electric (AI/ML Intern)",
      anchor: "#experience",
    },
    {
      id: "arac-lab",
      label: "Arac Lab, UCLA Health",
      anchor: "#experience",
    },
    {
      id: "optum",
      label: "Optum",
      anchor: "#experience",
    },
  ],
  resumeBackground: [
    { id: "hero", label: "About Eshanika Ray", anchor: "#hero" },
    { id: "background", label: "Background", anchor: "#hero" },
    { id: "resume-background", label: "Background", anchor: "#hero" },
  ],
};

const ID_TO_ANCHOR = Object.fromEntries(
  Object.values(CONTENT_REGISTRY)
    .flat()
    .map(({ id, anchor }) => [id, anchor])
);

window.CONTENT_REGISTRY = CONTENT_REGISTRY;
window.ID_TO_ANCHOR = ID_TO_ANCHOR;
