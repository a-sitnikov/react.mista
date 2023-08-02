import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
  webpackFinal: async (config) => {
    
    if (!config.resolve)
      config.resolve = {};

    if (!config.resolve.plugins)
      config.resolve.plugins = [];

    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  },

};
export default config;
