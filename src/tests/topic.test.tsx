import { waitFor } from '@testing-library/react'
import { renderWithProviders } from './test-utils'

import * as APITopicInfo from 'src/api/topic_info'
import * as APITopicMessages from 'src/api/topic_messages'

import Topic from 'src/pages/topic'
import { ITopicMessage } from 'src/store'
import * as ReactRouter from 'react-router'

const topicInfo = {
  id: 1,
  title: "Тестовая ветка",
  count: 102
}

const item0: ITopicMessage = {
  id: 0,
  n: 0,
  text: "Пост 0",
  user: "user 0",
  userId: 0,
  time: 1687795190000,
  vote: 0
};

const topicMessages: ITopicMessage[] = [
  {
    id: 1,
    n: 101,
    text: "Пост 101",
    user: "user 1",
    userId: 1,
    time: 1687795290000,
    vote: 0
  },
  {
    id: 1,
    n: 102,
    text: "Пост 102",
    user: "user 2",
    userId: 2,
    time: 1687795390000,
    vote: 0
  },
]

describe('Topic.Actions', () => {

  it('render', async () => {

    jest.spyOn(ReactRouter, "useLocation").mockReturnValue({
      pathname: "/topic.php",
      search: "id=1&page=2",
      hash: "",
      state: null,
      key: "default",
    })

    jest.spyOn(APITopicInfo, "fetchTopicInfo").mockReturnValue(Promise.resolve(topicInfo));
    jest.spyOn(APITopicMessages, "fetchTopicMessage").mockReturnValue(Promise.resolve(item0));
    jest.spyOn(APITopicMessages, "fetchTopicMessages").mockReturnValue(Promise.resolve(topicMessages));

    renderWithProviders(
      <ReactRouter.MemoryRouter>
        <Topic />
      </ReactRouter.MemoryRouter>
    );

    await waitFor(() => expect(APITopicInfo.fetchTopicInfo).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(APITopicMessages.fetchTopicMessage).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(APITopicMessages.fetchTopicMessages).toHaveBeenCalledTimes(1));

  })
})
