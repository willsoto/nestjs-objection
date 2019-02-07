module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/lib/**/*.ts", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "text", "lcov"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/lib/$1"
  },
  testMatch: ["<rootDir>/tests/**/*.spec.ts"]
};
