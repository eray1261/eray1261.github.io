/**
 * Experience Section Entry Transition
 *
 * Uses IntersectionObserver to detect when the Experience section
 * approaches the viewport and applies a subtle "settling into focus"
 * transition. The effect triggers once and remains stable.
 */

(function() {
  'use strict';

  // Respect reduced motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, apply in-view class immediately
    const experience = document.getElementById('experience');
    if (experience) {
      experience.classList.add('in-view');
    }
    return;
  }

  // Get the experience section
  const experienceSection = document.getElementById('experience');

  if (!experienceSection) {
    return;
  }

  // Track if transition has occurred (one-time only)
  let hasTransitioned = false;

  // Create IntersectionObserver with anticipatory margin
  // -30% means the callback fires when the section is 30% into the viewport
  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !hasTransitioned) {
          // Apply the in-view class to trigger CSS transition
          experienceSection.classList.add('in-view');
          hasTransitioned = true;

          // Stop observing since this is a one-time transition
          observer.unobserve(experienceSection);
        }
      });
    },
    {
      // Trigger before section is fully visible
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    }
  );

  // Start observing
  observer.observe(experienceSection);
})();
