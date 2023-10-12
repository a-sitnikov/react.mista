import { screen } from "@testing-library/react";

import CustomLink from "src/components/extensions/custom_link";
import { defaultOptionsState } from "src/store";
import { AppStore, renderWithProviders, setupStore } from "./test-utils";

const mockLinkToPost = jest.fn();
jest.mock("src/components/extensions/link_to_post", () => (props: any) => {
  mockLinkToPost(props);
  return <div data-testid="LinkToPost" />;
});

const mockYoutubeLink = jest.fn();
jest.mock("src/components/extensions/youtube_link", () => (props: any) => {
  mockYoutubeLink(props);
  return <div data-testid="YoutubeLink" />;
});

describe("CustomLink", () => {
  let store: AppStore;

  beforeAll(() => {
    const initialState = {
      options: {
        _persist: null,
        ...defaultOptionsState,
        items: {
          ...defaultOptionsState.items,
          showTooltipOnPostLink: "true",
          showYoutubeVideoTitle: "true",
          replaceCatalogMista: "true",
          fixBrokenLinks: "true",
        },
      },
    };

    store = setupStore(initialState);
  });

  it("link to post", () => {
    const href = "https://forum.mista.ru/topic.php?id=822078#10";

    renderWithProviders(<CustomLink href={href} />, { store });

    expect(mockLinkToPost).toHaveBeenCalledWith(
      expect.objectContaining({
        topicId: "822078",
        number: "10",
      })
    );
  });

  it("link to post href=react.mista", () => {
    const href =
      "https://a-sitnikov.github.io/react.mista/#/topic.php?id=822078#10";

    renderWithProviders(<CustomLink href={href} />, { store });

    expect(mockLinkToPost).toHaveBeenCalledWith(
      expect.objectContaining({
        topicId: "822078",
        number: "10",
      })
    );
  });

  it("youtube", () => {
    const href = "https://www.youtube.com/watch?v=mIkEKO-B_OU";

    renderWithProviders(<CustomLink href={href} />, { store });

    expect(mockYoutubeLink).toHaveBeenCalledTimes(1);
  });

  it("catalog.mista", async () => {
    const href = "http://catalog.mista.ru/public/590993/";

    renderWithProviders(<CustomLink href={href} />, { store });

    const link = await screen.findByRole("link");
    expect(link).toHaveProperty("href", "http://infostart.ru/public/590993/");
  });

  it("fix broken link", async () => {
    const href = "https://wikipadia.ru/имя_(значение";

    renderWithProviders(
      <CustomLink
        href={href}
        parentText='<a href="https://wikipadia.ru/имя_(значение">https://wikipadia.ru/имя_(значение</a>)'
      />,
      { store }
    );

    const link = await screen.findByRole("link");
    expect(link).toHaveProperty(
      "href",
      `https://wikipadia.ru/${encodeURIComponent("имя_(значение)")}`
    );
  });

  it("link without host", async () => {
    const href = "/users.php?id=111";

    renderWithProviders(<CustomLink href={href} />, { store });

    const link = await screen.findByRole("link");
    expect(link).toHaveProperty(
      "href",
      "https://forum.mista.ru/users.php?id=111"
    );
  });
});
