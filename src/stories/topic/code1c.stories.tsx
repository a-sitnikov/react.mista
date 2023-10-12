import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import Code1c from "src/components/extensions/code1c";
import "src/components/extensions/code1c.css";

import { text1 } from "src/tests/mock_data/mock_code1c";

const meta = {
  title: "topic/code1c",
  component: Code1c,
  parameters: {
    //layout: 'centered',
  },
  tags: [],
  argTypes: {},
} satisfies Meta<typeof Code1c>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    children: [text1],
  },
};

export const Mobile: Story = {
  args: {
    children: [text1],
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
};

export const Mobile_Dark: Story = {
  args: {
    children: [text1],
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
  decorators: [(story) => <div data-theme="dark">{story()}</div>],
};
