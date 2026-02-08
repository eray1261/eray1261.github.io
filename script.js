// Scroll container used for snap scrolling
const scrollContainer = document.getElementById("scroll-container");
const progressBar = document.getElementById("scroll-progress");
const backToTopButton = document.getElementById("back-to-top");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const modal = document.getElementById("preview-modal");
const modalClose = document.getElementById("modal-close");
const previewFrame = document.getElementById("preview-frame");
const previewText = document.getElementById("preview-text");
const previewTextList = document.getElementById("preview-text-list");
const chatbotEntry = document.getElementById("chatbot-entry");
const chatbotPanel = document.getElementById("chatbot-panel");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

// Backend API base (Vercel)
const API_BASE = "https://website-backend-eta-two.vercel.app";


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
const previewTextButtons = document.querySelectorAll("[data-preview-text]");

const openModal = (src) => {
  previewText.hidden = true;
  previewFrame.hidden = false;
  previewFrame.src = src;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const openTextModal = async (src) => {
  previewFrame.hidden = true;
  previewFrame.src = "";
  previewText.hidden = false;
  previewTextList.innerHTML = "";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  try {
    const response = await fetch(src);
    if (!response.ok) {
      throw new Error("Preview text unavailable.");
    }

    const text = await response.text();
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-"))
      .map((line) => line.replace(/^-+\s*/, ""));

    lines.forEach((line) => {
      const listItem = document.createElement("li");
      listItem.textContent = line;
      previewTextList.appendChild(listItem);
    });
  } catch (error) {
    const listItem = document.createElement("li");
    listItem.textContent = "Preview text is unavailable right now.";
    previewTextList.appendChild(listItem);
  }
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  previewFrame.src = "";
  previewTextList.innerHTML = "";
  previewText.hidden = true;
};

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-preview");
    if (src) {
      openModal(src);
    }
  });
});

previewTextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.getAttribute("data-preview-text");
    if (src) {
      openTextModal(src);
    }
  });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

const toggleChatbot = (isOpen) => {
  chatbotPanel.classList.toggle("is-open", isOpen);
  chatbotEntry.setAttribute("aria-expanded", String(isOpen));
  chatbotPanel.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) {
    chatbotInput.focus();
  }
};

const addChatMessage = (text, type = "assistant", links = []) => {
  const message = document.createElement("div");
  message.className = `chatbot__message chatbot__message--${type}`;
  message.textContent = text;
  if (links.length) {
    const learnMore = document.createElement("div");
    learnMore.className = "chatbot__learn-more";
    const title = document.createElement("strong");
    title.textContent = "Learn more";
    learnMore.appendChild(title);
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.anchor;
      anchor.textContent = link.label;
      anchor.addEventListener("click", (event) => {
        const target = document.querySelector(link.anchor);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
        toggleChatbot(false);
      });
      learnMore.appendChild(anchor);
    });
    message.appendChild(learnMore);
  }
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const setChatbotBusy = (isBusy) => {
  chatbotForm.querySelector("button").disabled = isBusy;
  chatbotInput.disabled = isBusy;
};

const handleChatSubmit = async (event) => {
  event.preventDefault();
  const question = chatbotInput.value.trim();
  if (!question) {
    return;
  }

  addChatMessage(question, "user");
  chatbotInput.value = "";
  setChatbotBusy(true);

  const loadingMessage = document.createElement("div");
  loadingMessage.className = "chatbot__message chatbot__message--assistant";
  loadingMessage.textContent = "Let me check...";
  chatbotMessages.appendChild(loadingMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("Chat request failed.");
    }

    const data = await response.json();
    const mappedLinks = Array.isArray(data.learnMore)
      ? data.learnMore
          .map((item) => {
            const anchor = window.ID_TO_ANCHOR?.[item.id];
            if (!anchor) {
              return null;
            }
            return { label: item.label, anchor };
          })
          .filter(Boolean)
      : [];
    loadingMessage.remove();
    addChatMessage(data.answer, "assistant", mappedLinks);
  } catch (error) {
    loadingMessage.textContent =
      "Sorry, I couldn't reach the assistant right now. Please try again soon.";
  } finally {
    setChatbotBusy(false);
  }
};

if (chatbotEntry && chatbotPanel) {
  chatbotEntry.addEventListener("click", () => {
    toggleChatbot(!chatbotPanel.classList.contains("is-open"));
  });

  chatbotClose.addEventListener("click", () => toggleChatbot(false));
  chatbotForm.addEventListener("submit", handleChatSubmit);
}

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

  if (event.key === "Escape" && chatbotPanel.classList.contains("is-open")) {
    toggleChatbot(false);
  }
});
