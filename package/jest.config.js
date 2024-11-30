module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Add optional setup file
    moduleDirectories: ["node_modules", "src"], // Resolve imports
};
