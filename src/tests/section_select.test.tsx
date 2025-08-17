import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";

import * as API from "src/api/sections";
import SectionSelect from "src/pages/topics_list/sections";
import type { IProps } from "src/pages/topics_list/sections";

import { mock_sections } from "./mock_data";
import { groupBy } from "src/utils";

describe("SectionSelect", () => {
  it("render", async () => {
    const props: IProps = {
      defaultValue: "Секция",
      selected: "",
      id: "s1",
      size: "sm",
    };

    jest.spyOn(API, "fetchSections").mockReturnValue(
      Promise.resolve({
        items: mock_sections,
        tree: groupBy(mock_sections, (item) => item.forum),
      })
    );

    renderWithProviders(<SectionSelect {...props} />);
    await waitFor(() => expect(API.fetchSections).toHaveBeenCalledTimes(1));

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(mock_sections.length + 1);
    expect(options[0].textContent).toBe("Секция");
    expect(options[1].textContent).toBe(mock_sections[0].name);
    expect(options[2].textContent).toBe(mock_sections[1].name);
  });
});
