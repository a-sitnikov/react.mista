//@flow
import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api'
import type { RequestTopicsList, ResponseTopicsList } from 'src/api'
import type { State } from 'src/reducers'

export const requestTopicsList = createAction('REQUEST_TOPICS_LIST');
export const receiveTopicsList = createAction('RECEIVE_TOPICS_LIST', list => ({
  payload: {
    list
  },
  error: false
}));
export const receiveTopicsListFailed = createAction('RECEIVE_TOPICS_LIST', error => ({
  payload: error,
  error: true
}));
export const clearTopicsList = createAction('CLEAR_TOPICS_LIST');
export const togglePreview = createAction('TOGGLE_PREVIEW', id => ({
  payload : {
    id
  }
}));

const fetchTopicsList = (params: any) => async (dispatch: any, getState: any) => {

  dispatch(requestTopicsList())

  const page = params.page || 1;
  let reqestParams: RequestTopicsList = {};

  let topicsPerPage = +getState().options.items.topicsPerPage;
  if (topicsPerPage > 99) topicsPerPage = 99;

  let topicsCount = page * topicsPerPage;
  reqestParams.topics = topicsCount;

  if (params.section)
    reqestParams.section_short_name = params.section;

  if (params.forum)
    reqestParams.forum = params.forum;

  if (params.user_id)
    reqestParams.user_id = params.user_id;

  if (params.mytopics)
    reqestParams.mytopics = params.mytopics;

  try {
    const json = await API.getTopicsList(reqestParams);

    let data = json.slice(-topicsPerPage);
    dispatch(receiveTopicsList(data));
  } catch (e) {
    dispatch(receiveTopicsListFailed(e));
    console.error(e);
  }

}

const shouldFetchTopicsList = (state: State) => {
  const topicsList = state.topicsList;
  if (!topicsList) {
    return true
  }
  if (topicsList.isFetching) {
    return false
  }
  return true
}

export const fetchTopicsListIfNeeded = (params: any): any => (dispatch: any, getState: any) => {
  if (shouldFetchTopicsList(getState())) {
    return dispatch(fetchTopicsList(params));
  }
}
