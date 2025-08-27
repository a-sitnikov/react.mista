import { type Meta, type StoryObj } from "@storybook/react";
import Row from "src/pages/topics_list/row";
import { type RootState } from "src/store";
// eslint-disable-next-line no-restricted-imports
import { mock_topics_list_item0 } from "src/tests/mock_data/mock_topics_list";
import { themes } from "storybook/theming";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

import { wrapper } from "../utils";

import "src/index.css";
import "src/pages/topics_list/topics_list.css";

const preloadedState: Partial<RootState> = {};

const meta = {
  title: "topics list/Row",
  component: Row,
  parameters: {
    //layout: 'centered',
  },
  tags: [],
  decorators: [(story) => wrapper(story(), preloadedState)],
  argTypes: {
    // forum: {
    //   control: "select",
    //   options: ["1C", "IT", "JOB", "LIFE"],
    // },
  },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    item: mock_topics_list_item0,
  },
};

export const Mobile: Story = {
  args: {
    item: mock_topics_list_item0,
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
    item: mock_topics_list_item0,
  },
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
    theme: themes.dark,
  },
  decorators: [(story) => <div data-theme="dark">{story()}</div>],
};
