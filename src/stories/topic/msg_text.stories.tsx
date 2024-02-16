import type { Meta, StoryObj } from "@storybook/react";

import MsgText from "src/pages/topic/row/msg_text";
import {
  mock_topicInfo,
  mock_topic_item0,
} from "src/tests/mock_data/mock_topic";

import { wrapper } from "../utils";

import "src/index.css";
import "src/pages/topics_list/topics_list.css";
import { RootState, defaultOptionsState } from "src/store";

const preloadedState: Partial<RootState> = {
  topic: {
    info: mock_topicInfo,
    items: [mock_topic_item0],
    status: "success",
  },
  options: { ...defaultOptionsState, _persist: null },
};

const meta = {
  title: "topic/MsgText",
  component: MsgText,
  tags: [],
  decorators: [(story) => wrapper(story(), preloadedState)],
  argTypes: {},
} satisfies Meta<typeof MsgText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    topicId: mock_topic_item0.id,
    topicDate: mock_topic_item0.time,
    n: mock_topic_item0.n,
    html: mock_topic_item0.text,
    vote: mock_topic_item0.vote,
  },
};
