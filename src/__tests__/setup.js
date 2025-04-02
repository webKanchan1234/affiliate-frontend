// Import Jest DOM extensions
import '@testing-library/jest-dom/vitest';

// Mock window.matchMedia which is not implemented in JSDOM
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Mock scrollTo
window.scrollTo = () => {};