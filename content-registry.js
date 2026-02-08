const CONTENT_REGISTRY = {
  hepnovate: [
    { id: "hepnovate-overview", label: "Overview", anchor: "#hepnovate" },
    { id: "hepnovate-problem", label: "Problem Motivation", anchor: "#hepnovate" },
    { id: "hepnovate-research-questions", label: "Research Questions", anchor: "#hepnovate" },
    { id: "hepnovate-study-design", label: "Study Design", anchor: "#hepnovate" },
    { id: "hepnovate-system", label: "System Architecture", anchor: "#hepnovate" },
    { id: "hepnovate-findings", label: "Key Findings", anchor: "#hepnovate" },
    { id: "hepnovate-limitations", label: "Limitations", anchor: "#hepnovate" },
    { id: "hepnovate-clinical-impact", label: "Clinical Impact", anchor: "#hepnovate" },
    { id: "hepnovate-evaluation-metrics", label: "Evaluation Metrics", anchor: "#hepnovate" },
    { id: "hepnovate-summary", label: "Summary", anchor: "#hepnovate" },
  ],

  hallucination: [
    { id: "llm-hallucination-overview", label: "Overview", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-problem", label: "Problem Motivation", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-method", label: "Method", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-training", label: "Training Strategy", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-experiments", label: "Experimental Setup", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-results", label: "Results", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-analysis", label: "Error Analysis", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-future", label: "Future Directions", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-conclusion", label: "Conclusion", anchor: "#llm-hallucination" },
    { id: "llm-hallucination-summary", label: "Summary", anchor: "#llm-hallucination" },
  ],

  snakes: [
    { id: "rl-snakes-overview", label: "Overview", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-problem", label: "Problem Motivation", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-contributions", label: "Key Contributions", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-related-work", label: "Related Work", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-methodology", label: "Methodology", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-reward", label: "Reward Design", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-learning", label: "Learning Approaches", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-experiments", label: "Experimental Setup", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-results", label: "Results", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-discussion", label: "Discussion", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-limitations", label: "Limitations", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-future", label: "Future Work", anchor: "#data-driven-active-snakes" },
    { id: "rl-snakes-conclusion", label: "Conclusion", anchor: "#data-driven-active-snakes" },
  ],

  docuTally: [
    { id: "docu-tally-overview", label: "Overview", anchor: "#docu-tally" },
    { id: "docu-tally-problem", label: "Problem Motivation", anchor: "#docu-tally" },
    { id: "docu-tally-related-work", label: "Related Work", anchor: "#docu-tally" },
    { id: "docu-tally-lsa", label: "Latent Semantic Analysis", anchor: "#docu-tally" },
    { id: "docu-tally-algorithm", label: "Algorithm", anchor: "#docu-tally" },
    { id: "docu-tally-ranking", label: "Ranking Mechanism", anchor: "#docu-tally" },
    { id: "docu-tally-experiments", label: "Experimental Setup", anchor: "#docu-tally" },
    { id: "docu-tally-results", label: "Results", anchor: "#docu-tally" },
    { id: "docu-tally-discussion", label: "Discussion", anchor: "#docu-tally" },
    { id: "docu-tally-limitations", label: "Limitations", anchor: "#docu-tally" },
    { id: "docu-tally-conclusion", label: "Conclusion", anchor: "#docu-tally" },
  ],

  survey: [
    { id: "survey-overview", label: "Overview", anchor: "#survey" },
    { id: "survey-problem", label: "Problem Motivation", anchor: "#survey" },
    { id: "survey-background-diffusion", label: "Diffusion Models Background", anchor: "#survey" },
    { id: "survey-background-mllm", label: "MLLMs Background", anchor: "#survey" },
    { id: "survey-integration-gap", label: "Integration Gap", anchor: "#survey" },
    { id: "survey-taxonomy", label: "Integration Taxonomy", anchor: "#survey" },
    { id: "survey-diffusion-applications", label: "Diffusion-Based Systems", anchor: "#survey" },
    { id: "survey-mllm-applications", label: "MLLM-Based Systems", anchor: "#survey" },
    { id: "survey-challenges", label: "Challenges", anchor: "#survey" },
    { id: "survey-future-directions", label: "Future Directions", anchor: "#survey" },
    { id: "survey-summary", label: "Summary", anchor: "#survey" },
  ],

  otStrap: [
    { id: "ot-strap-overview", label: "Overview", anchor: "#ot-strap" },
    { id: "ot-strap-problem", label: "Problem Motivation", anchor: "#ot-strap" },
    { id: "ot-strap-key-idea", label: "Core Idea", anchor: "#ot-strap" },
    { id: "ot-strap-method", label: "Method", anchor: "#ot-strap" },
    { id: "ot-strap-retrieval", label: "Retrieval Pipeline", anchor: "#ot-strap" },
    { id: "ot-strap-experiments", label: "Experimental Setup", anchor: "#ot-strap" },
    { id: "ot-strap-results-retrieval", label: "Retrieval Results", anchor: "#ot-strap" },
    { id: "ot-strap-results-policy", label: "Policy Results", anchor: "#ot-strap" },
    { id: "ot-strap-robustness", label: "Robustness Analysis", anchor: "#ot-strap" },
    { id: "ot-strap-limitations", label: "Limitations", anchor: "#ot-strap" },
    { id: "ot-strap-conclusion", label: "Conclusion", anchor: "#ot-strap" },
  ],

  interpra: [
    { id: "interpra-overview", label: "Overview", anchor: "#interpra" },
    { id: "interpra-problem", label: "Problem Motivation", anchor: "#interpra" },
    { id: "interpra-related-work", label: "Related Work", anchor: "#interpra" },
    { id: "interpra-core-idea", label: "Core Idea", anchor: "#interpra" },
    { id: "interpra-design-requirements", label: "Design Requirements", anchor: "#interpra" },
    { id: "interpra-architecture", label: "System Architecture", anchor: "#interpra" },
    { id: "interpra-features-page", label: "Features Page", anchor: "#interpra" },
    { id: "interpra-steering", label: "Model Steering", anchor: "#interpra" },
    { id: "interpra-user-profiling", label: "User Profiling", anchor: "#interpra" },
    { id: "interpra-ethics", label: "Ethics", anchor: "#interpra" },
    { id: "interpra-conclusion", label: "Conclusion", anchor: "#interpra" },
  ],

  era5: [
    { id: "era5-overview", label: "Overview", anchor: "#era-5" },
    { id: "era5-problem", label: "Problem Motivation", anchor: "#era-5" },
    { id: "era5-related-work", label: "Related Work", anchor: "#era-5" },
    { id: "era5-data-sources", label: "Data Sources", anchor: "#era-5" },
    { id: "era5-task-formulation", label: "Task Formulation", anchor: "#era-5" },
    { id: "era5-pipeline", label: "Data Pipeline", anchor: "#era-5" },
    { id: "era5-splits", label: "Train–Val–Test Split", anchor: "#era-5" },
    { id: "era5-baselines", label: "Baselines", anchor: "#era-5" },
    { id: "era5-analysis", label: "Analysis", anchor: "#era-5" },
    { id: "era5-limitations", label: "Limitations", anchor: "#era-5" },
    { id: "era5-conclusion", label: "Conclusion", anchor: "#era-5" },
  ],

  resume: [
    { id: "resume-overview", label: "Overview", anchor: "#resume" },
    { id: "resume-education", label: "Education", anchor: "#resume" },
    { id: "resume-skills", label: "Skills", anchor: "#resume" },
    { id: "resume-experience-rfa", label: "RFA Electric", anchor: "#resume" },
    { id: "resume-experience-ucla-health", label: "UCLA Health", anchor: "#resume" },
    { id: "resume-experience-optum", label: "Optum", anchor: "#resume" },
    { id: "resume-experience-internships", label: "Early Internships", anchor: "#resume" },
    { id: "resume-research", label: "Research", anchor: "#resume" },
    { id: "resume-awards", label: "Awards", anchor: "#resume" },
    { id: "resume-summary", label: "Summary", anchor: "#resume" },
  ],
};

const ID_TO_ANCHOR = Object.fromEntries(
  Object.values(CONTENT_REGISTRY).flat().map(({ id, anchor }) => [id, anchor])
);

window.CONTENT_REGISTRY = CONTENT_REGISTRY;
window.ID_TO_ANCHOR = ID_TO_ANCHOR;
