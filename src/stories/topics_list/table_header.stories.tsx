import { type Meta, type StoryObj } from "@storybook/react";

import TableHeader from "src/pages/topics_list/table_header";

import "src/index.css";
import "src/pages/topics_list/topics_list.css";

const meta = {
  title: "topics list/TableHeader",
  component: TableHeader,
  parameters: {},
  tags: [""],
  argTypes: {},
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableHeader_Story: Story = {
  name: "Desktop",
  args: {
    isLoading: false,
    onUpdateClick: () => {},
  },
};
