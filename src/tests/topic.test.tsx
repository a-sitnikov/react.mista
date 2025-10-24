import * as APITopicInfo from "src/api/topic_info";
import * as APITopicMessages from "src/api/topic_messages";
import Topic from "src/pages/topic";
import {
  mock_topicInfo,
  mock_topic_item0,
  mock_topicMessages_p2,
} from "./mock_data";

import { renderWithProviders } from "./test-utils";
import { waitFor } from "@testing-library/react";
import * as ReactRouter from "react-router";

describe("Topic", () => {
  it("render", async () => {
    jest.spyOn(ReactRouter, "useLocation").mockReturnValue({
      pathname: "/topic.php",
      search: "id=1&page=2",
      hash: "",
      state: null,
      key: "default",
    });

    jest
      .spyOn(APITopicInfo, "fetchTopicInfo")
      .mockReturnValue(Promise.resolve(mock_topicInfo));
    jest
      .spyOn(APITopicMessages, "fetchTopicMessage")
      .mockReturnValue(Promise.resolve(mock_topic_item0));
    jest
      .spyOn(APITopicMessages, "fetchTopicMessages")
      .mockReturnValue(Promise.resolve(mock_topicMessages_p2));

    renderWithProviders(
      <ReactRouter.MemoryRouter>
        <Topic />
      </ReactRouter.MemoryRouter>
    );

    await waitFor(() =>
      expect(APITopicInfo.fetchTopicInfo).toHaveBeenCalledTimes(1)
    );
    await waitFor(() =>
      expect(APITopicMessages.fetchTopicMessage).toHaveBeenCalledTimes(1)
    );
    await waitFor(() =>
      expect(APITopicMessages.fetchTopicMessages).toHaveBeenCalledTimes(1)
    );
  });
});
