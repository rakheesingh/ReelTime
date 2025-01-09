module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"], // Update the path if your setupTests file is located elsewhere
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Or ts-jest if you're using ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
