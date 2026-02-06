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

scrollContainer.addEventListener("scroll", updateProgress);
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
  link.addEventListener("click", () => {
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

// Tag filtering for research projects
const filterBar = document.querySelector(".filter-bar");
const projectCards = document.querySelectorAll(".project-card");

if (filterBar && projectCards.length > 0) {
  // Collect all unique tags from project cards
  const allTags = new Set();
  projectCards.forEach((card) => {
    card.querySelectorAll(".tags span").forEach((tag) => {
      allTags.add(tag.textContent.trim());
    });
  });

  // Sort tags alphabetically and add filter buttons
  [...allTags].sort().forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "filter-tag";
    btn.setAttribute("data-filter", tag);
    btn.textContent = tag;
    filterBar.appendChild(btn);
  });

  // Shared filter function
  function applyFilter(filter) {
    // Update active state in filter bar
    filterBar.querySelectorAll(".filter-tag").forEach((b) => b.classList.remove("is-active"));
    const matchingBtn = filterBar.querySelector(`.filter-tag[data-filter="${CSS.escape(filter)}"]`);
    if (matchingBtn) matchingBtn.classList.add("is-active");

    // Show/hide cards
    projectCards.forEach((card) => {
      if (filter === "all") {
        card.classList.remove("hidden");
      } else {
        const cardTags = [...card.querySelectorAll(".tags span")].map((t) => t.textContent.trim());
        card.classList.toggle("hidden", !cardTags.includes(filter));
      }
    });
  }

  // Filter bar click
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-tag");
    if (!btn) return;
    applyFilter(btn.getAttribute("data-filter"));
  });

  // Card tag click — trigger the same filter
  projectCards.forEach((card) => {
    card.querySelectorAll(".tags span").forEach((tag) => {
      tag.addEventListener("click", () => {
        applyFilter(tag.textContent.trim());
      });
    });
  });
}
