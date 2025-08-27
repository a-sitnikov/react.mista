import { type Meta, type StoryObj } from "@storybook/react";

import Code1c from "src/components/extensions/code1c";
import "src/components/extensions/code1c.css";
// eslint-disable-next-line no-restricted-imports
import { text1 } from "src/tests/mock_data/mock_code1c";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

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
