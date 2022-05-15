import { createAction } from '@reduxjs/toolkit'
import { urlTopicMessages } from 'src/api';

import { fetchTopicInfo } from 'src/api/topicinfo'
import { fetchTopicMessage, fetchTopicMessages } from 'src/api/topicMessages'
import { ITopicInfo, ITopicMessage } from '.';

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

export const getTopic = (topicId: number, page: number | string, item0: ITopicMessage) => async (dispatch: any) => {

  dispatch(requestTopic())

  let info: ITopicInfo;
  try {
    info = await fetchTopicInfo(topicId);
  } catch (e) {
    console.error(e);
    info = {
      id: topicId,
      title: '',
      count: 0
    };
  }
  try {
    let _item0 = item0;
    let _items;
    if (page === 'last20') {

      if (info.count > 21) {

        if (!_item0) {
          _item0 = await fetchTopicMessage(topicId, 0);
        }

        let first = info.count - 20;
        _items = await fetchTopicMessages({
          id: topicId,
          from: first,
          to: 1010
        });

      } else {
        let items = await fetchTopicMessages({
          id: topicId,
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
          _item0 = await fetchTopicMessage(topicId, 0);
        }

        _items = await fetchTopicMessages({
          id: topicId,
          from: first,
          to: last
        });

      } else {
        if (_item0)
          first = 1;
        else
          first = 0;

        let items = await fetchTopicMessages({
          id: topicId,
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

    if (info.count === 0 && _items.length > 0)
      info.count = _items[_items.length - 1].n;

    if (page === 'last20' && _items.length > 20) {
      _items = _items.slice(-20);
    }

    dispatch(receiveTopic(info, _item0, _items));

  } catch (error) {

    console.error('Failed to fetch topic:', error);
    dispatch(receiveTopicFailed(error.message));

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

export const getTopicIfNeeded = (topicId: number, page: number |string, item0: any): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(getTopic(topicId, page, item0));
  }
}

export type FetchNewMessageseParams = {
  id: number | string,
  last: number
}

export const getNewMessages = (id: number, count: number) => async (dispatch: any) => {

  dispatch(requestNewMessages());

  try {
    const list = await fetchTopicMessages({
      id: id,
      from: count + 1,
      to: 1050
    });
    dispatch(receiveNewMessages(list));

  } catch (e) {
    console.error('Failed to fetch new messages:', (e as Error).message);
    dispatch(receiveNewMessagesFailed((e as Error).message));
  }

}

export const getNewMessagesIfNeeded = () => (dispatch: any, getState: any) => {
  const state = getState();
  const { id, count } = state.topic.info;
  if (shouldFetch(state)) {
    return dispatch(getNewMessages(id, count));
  }
}