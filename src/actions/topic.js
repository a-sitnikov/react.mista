//@flow
import * as API from 'src/api'

import type { ResponseInfo, ResponseMessage, ResponseMessages } from 'src/api'

export type REQUEST_TOPIC = {
  type: 'REQUEST_TOPIC'
}

export type RECEIVE_TOPIC = {
  type: 'RECEIVE_TOPIC',
  info: ResponseInfo,
  item0: ResponseMessage,
  items: ResponseMessages,
  receivedAt: Date
}

export type RECEIVE_TOPIC_FAILED = {
  type: 'RECEIVE_TOPIC_FAILED',
  error: any,
  receivedAt: Date
}

export type REQUEST_NEW_MESSAGES = {
  type: 'REQUEST_NEW_MESSAGES'
}

export type RECEIVE_NEW_MESSAGES = {
  type: 'RECEIVE_NEW_MESSAGES',
  items: ResponseMessages,
  receivedAt: Date
}

export type CLOSE_TOPIC = {
  type: 'CLOSE_TOPIC'
}


export type TopicAction = REQUEST_TOPIC | RECEIVE_TOPIC | RECEIVE_TOPIC_FAILED | CLOSE_TOPIC | REQUEST_NEW_MESSAGES | RECEIVE_NEW_MESSAGES;

export const requestTopic = (): any => ({
  type: 'REQUEST_TOPIC'
})

export const receiveTopic = (info: ResponseInfo, item0: ?ResponseMessage, items: ResponseMessages): any => {

  return {
    type: 'RECEIVE_TOPIC',
    info,
    item0,
    items,
    receivedAt: Date.now()
  }
}

export const closeTopic = (): any => {

  return {
    type: 'CLOSE_TOPIC',
  }
}

export const fetchTopic = (params: any, item0: ?ResponseMessage): any => async (dispatch: any) => {

  dispatch(requestTopic())

  let info;
  try {
    info = await API.getTopicInfo({ id: params.id });
  } catch (e) {
    console.error(e);
    info = {
      id: params.id,
      text: '',
      answers_count: "0"
    };
  }

  try {
    let page = params.page || 1;

    let _item0 = item0;
    let _items;
    if (page === 'last20') {

      if (+info.answers_count > 21) {

        if (!_item0) {
          let items = await API.getTopicMessages({
            id: params.id,
            from: 0,
            to: 1
          });
          _item0 = items[0];
        }

        let first = +info.answers_count - 20;
        _items = await API.getTopicMessages({
          id: params.id,
          from: first,
          to: 1010
        });

      } else {
        let items = await API.getTopicMessages({
          id: params.id,
          from: 0,
          to: 1010
        });
        _item0 = items[0];
        _items = items.slice(1);
      }

    } else {

      page = +page;
      let first = 0;
      let last = page * 100 - 1;

      if (page > 1) {

        first = (page - 1) * 100;
        if (!_item0) {
          let items = await API.getTopicMessages({
            id: params.id,
            from: 0,
            to: 1
          });
          _item0 = items[0];
        }

        _items = await API.getTopicMessages({
          id: params.id,
          from: first,
          to: last
        });

      } else {
        if (_item0)
          first = 1;
        else
          first = 0;

        let items = await API.getTopicMessages({
          id: params.id,
          from: first,
          to: last
        });

        if (_item0) {
          _items = items;
        } else {
          _item0 = items[0];
          _items = items.slice(1);
        }
      }

    }

    if (info.answers_count === "0" && _items.length > 0)
      info.answers_count = _items[_items.length - 1].n;

    if (page === 'last20' && _items.length > 20) {
      _items = _items.slice(-20);
    }

    dispatch(receiveTopic(info, _item0, _items));

  } catch (error) {

    console.error('Failed to fetch topic:', error);

    dispatch({
      type: 'RECEIVE_TOPIC_FAILED',
      error,
      receivedAt: Date.now()
    });

  }
}

const shouldFetch = (state) => {
  const topic = state.topic;
  if (!topic) {
    return true
  }
  if (topic.isFetching) {
    return false
  }
  return true
}

export const fetchTopicIfNeeded = (params: any, item0: ?ResponseMessage): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchTopic(params, item0));
  }
}

export type FetchNewMessageseParams = {
  id: number | string,
  last: number
}

export const fetchNewMessages = (params: FetchNewMessageseParams): any => async (dispatch: any) => {

  dispatch({
    type: 'REQUEST_NEW_MESSAGES'
  });

  try {
    const json = await API.getTopicMessages({
      id: params.id,
      from: params.last + 1,
      to: 1002
    });

    dispatch({
      type: 'RECEIVE_NEW_MESSAGES',
      items: json,
      receivedAt: Date.now()
    });

  } catch (error) {
    console.error('Failed to fetch new messages:', error);

    dispatch({
      type: 'RECEIVE_NEW_MESSAGES_FAILED',
      error,
      receivedAt: Date.now()
    });
  }

}

export const fetchNewMessagesIfNeeded = (params: FetchNewMessageseParams): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchNewMessages(params));
  }
}