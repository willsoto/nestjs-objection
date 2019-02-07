module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "lcov"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/lib/$1"
  },
  testMatch: ["<rootDir>/tests/**/*.spec.ts"]
};
