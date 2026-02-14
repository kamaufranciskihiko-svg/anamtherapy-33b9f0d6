import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",               // For React component tests
    globals: true,                       // Allows using describe/it without imports
    setupFiles: ["./src/test/setup.ts"], // Optional setup utilities
    include: ["src/**/*.{test,spec}.{ts,tsx}"], // Which files to run tests on
  },
});
