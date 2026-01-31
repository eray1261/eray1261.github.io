const revealElements = document.querySelectorAll(".reveal");
const experienceSection = document.querySelector(".experience");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const observer = new IntersectionObserver(
  (entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealElements.forEach((element) => observer.observe(element));

if (experienceSection && !prefersReducedMotion) {
  const experienceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "20% 0px -20% 0px",
    }
  );

  experienceObserver.observe(experienceSection);
}
