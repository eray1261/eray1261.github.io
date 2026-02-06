// Scroll container used for snap scrolling
const scrollContainer = document.getElementById("scroll-container");
const progressBar = document.getElementById("scroll-progress");
const backToTopButton = document.getElementById("back-to-top");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const modal = document.getElementById("preview-modal");
const modalClose = document.getElementById("modal-close");
const previewFrame = document.getElementById("preview-frame");

// Update scroll progress indicator
const updateProgress = () => {
  const scrollTop = scrollContainer.scrollTop;
  const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  backToTopButton.classList.toggle("is-visible", scrollTop > 400);
};

const sections = Array.from(document.querySelectorAll(".section"));
let snapTimeout;

const snapToNearestSection = () => {
  const scrollTop = scrollContainer.scrollTop;
  const nearest = sections.reduce(
    (closest, section) => {
      const distance = Math.abs(section.offsetTop - scrollTop);
      return distance < closest.distance ? { section, distance } : closest;
    },
    { section: sections[0], distance: Number.POSITIVE_INFINITY }
  );

  if (nearest.section) {
    scrollContainer.scrollTo({ top: nearest.section.offsetTop, behavior: "smooth" });
  }
};

const handleScroll = () => {
  updateProgress();
  window.clearTimeout(snapTimeout);
  snapTimeout = window.setTimeout(snapToNearestSection, 140);
};

scrollContainer.addEventListener("scroll", handleScroll);
window.addEventListener("load", updateProgress);

// Back to top action
backToTopButton.addEventListener("click", () => {
  scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (target) {
      event.preventDefault();
      scrollContainer.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
    nav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// Intersection Observer for reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

const revealItems = document.querySelectorAll(".reveal");
revealItems.forEach((item, index) => {
  // Apply staggered delay for smoother sequencing
  item.style.transitionDelay = `${index * 0.08}s`;
  observer.observe(item);
});

// Project preview modal logic
const previewButtons = document.querySelectorAll("[data-preview]");

const openModal = (src) => {
  previewFrame.src = src;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  previewFrame.src = "";
};

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-preview");
    if (src) {
      openModal(src);
    }
  });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Experience timeline interactions for mobile + accessibility
const timelineCards = document.querySelectorAll(".timeline-card");

const isCoarsePointer = () =>
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

timelineCards.forEach((card) => {
  const setExpanded = (expanded) => {
    card.classList.toggle("is-open", expanded);
    card.setAttribute("aria-expanded", String(expanded));
  };

  card.addEventListener("click", () => {
    if (isCoarsePointer()) {
      setExpanded(!card.classList.contains("is-open"));
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExpanded(!card.classList.contains("is-open"));
    }
  });

  card.addEventListener("focus", () => {
    if (!card.classList.contains("is-open")) {
      card.setAttribute("aria-expanded", "true");
    }
  });

  card.addEventListener("blur", () => {
    if (!card.classList.contains("is-open")) {
      card.setAttribute("aria-expanded", "false");
    }
  });
});

// Close modal on escape
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
