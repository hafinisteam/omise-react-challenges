module.exports = {
  setupFiles: ["./src/setupJest.js"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleFileExtensions: ["js", "json", "jsx"],
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
    "^.+\\.js$": "babel-jest"
  }
};
