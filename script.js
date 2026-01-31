const pinnedSection = document.querySelector(".pinned");
const stageElements = document.querySelectorAll(".stage");
const timelineItems = document.querySelectorAll(".timeline-item");
const researchGroups = document.querySelectorAll(".research-group");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (pinnedSection && stageElements.length > 0 && !prefersReducedMotion) {
  document.body.classList.add("is-enhanced");
  const entryObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pinnedSection.classList.add("is-entered");
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  entryObserver.observe(pinnedSection);

  const state = {
    start: 0,
    end: 0,
  };

  const setActiveStage = (stage) => {
    stageElements.forEach((element, index) => {
      element.classList.toggle("is-active", index === stage);
    });
  };

  const revealProgressively = (nodes, progress) => {
    const total = nodes.length;
    nodes.forEach((node, index) => {
      const threshold = total > 1 ? index / (total - 1) : 0;
      node.classList.toggle("is-visible", progress >= threshold);
    });
  };

  const updateBounds = () => {
    const rect = pinnedSection.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    state.start = rect.top + scrollTop;
    state.end = state.start + pinnedSection.offsetHeight - window.innerHeight;
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const update = () => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const progress = clamp(
      (scrollTop - state.start) / (state.end - state.start || 1),
      0,
      1
    );

    if (progress < 0.5) {
      setActiveStage(0);
      revealProgressively(timelineItems, progress / 0.5);
    } else {
      setActiveStage(1);
      revealProgressively(researchGroups, (progress - 0.5) / 0.5);
    }
  };

  const onScroll = () => {
    window.requestAnimationFrame(update);
  };

  updateBounds();
  update();

  window.addEventListener("resize", () => {
    updateBounds();
    update();
  });
  window.addEventListener("scroll", onScroll, { passive: true });
}
