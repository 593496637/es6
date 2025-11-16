const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  // ✅ 使用 jsdom 环境来测试 React 组件
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  // ✅ e2e 相关的 Playwright 用例由 `pnpm test:e2e` 单独运行，不要交给 Jest
  testPathIgnorePatterns: ["/node_modules/", "/e2e/", "/test-results/"],
  // ✅ 在每个测试文件运行前，先执行一次这个 setup 文件
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
