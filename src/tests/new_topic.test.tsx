import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { setupStore, renderWithProviders } from "./test-utils";
import NewTopic from "src/pages/topics_list/new_topic";
import { NewTopicState } from "src/store";

describe("NewTopic", () => {
  const newTopic: NewTopicState = {
    status: "init",
    section: null,
    text: "",
    subject: "",
    forum: "1C",
    isVoting: false,
  };

  let initialState = {
    newTopic,
  };

  beforeAll(() => {});

  it("render", () => {
    const store = setupStore(initialState);
    renderWithProviders(<NewTopic />, { store });

    expect(screen.getByRole("textbox", { name: "Тема" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Сообщение" })
    ).toBeInTheDocument();
  });

  it("render 10 voting options", () => {
    const store = setupStore(initialState);
    renderWithProviders(<NewTopic />, { store });

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const inputs = screen.getAllByRole("textbox", { name: /Вариант/ });
    expect(inputs.length).toBe(10);
    expect(inputs[0]).toBeInTheDocument();
  });
});
