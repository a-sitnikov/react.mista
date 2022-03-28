//@flow
import * as API from 'src/api'
import { createAction } from '@reduxjs/toolkit'

import type { ResponseInfo, ResponseMessage, ResponseMessages } from 'src/api'

export const requestTopic = createAction('REQUEST_TOPIC');
export const receiveTopic = createAction('RECEIVE_TOPIC', (info, item0, list) => ({
  payload: {
    info,
    item0,
    list
  },
  error: false
}));
export const receiveTopicFailed = createAction('RECEIVE_TOPIC', error => ({
  payload: error,
  error: true
}));
export const clearTopicMessages = createAction('CLEAR_TOPIC_MESSAGES');

export const requestNewMessages = createAction('REQUEST_NEW_MESSAGES');
export const receiveNewMessages = createAction('RECEIVE_NEW_MESSAGES', (list) => ({
  payload: {
    list
  },
  error: false
}));
export const receiveNewMessagesFailed = createAction('RECEIVE_NEW_MESSAGES', error => ({
  payload: error,
  error: true
}));

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
    dispatch(receiveTopicFailed(error));

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

  dispatch(requestNewMessages());

  try {
    const json = await API.getTopicMessages({
      id: params.id,
      from: +params.last + 1,
      to: 1002
    });

    dispatch(receiveNewMessages(json));

  } catch (error) {
    console.error('Failed to fetch new messages:', error);
    dispatch(receiveNewMessagesFailed(error));
  }

}

export const fetchNewMessagesIfNeeded = (params: FetchNewMessageseParams): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(fetchNewMessages(params));
  }
}