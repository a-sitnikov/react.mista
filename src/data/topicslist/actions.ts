import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api/topicslist'
import { domain, urlTopicsList } from 'src/api/index';

import { RootState } from '../store';

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
export const togglePreview = createAction('TOGGLE_PREVIEW', (id, msgNumber) => ({
  payload : {
    id,
    msgNumber
  }
}));

const getTopicsList = (params: any) => async (dispatch: any, getState: any) => {

  dispatch(requestTopicsList())

  const page = params.page || 1;
  let reqestParams: any = {};

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
    const json = await API.fetchTopicsList(reqestParams);

    let data = json.slice(-topicsPerPage);
    dispatch(receiveTopicsList(data));

  } catch (e) {

    dispatch(receiveTopicsListFailed(`${e.message} ${domain}/${urlTopicsList}`));
    console.error(e.message);

  }

}

const shouldGetTopicsList = (state: RootState) => {
  const topicsList = state.topicsList;
  if (!topicsList) {
    return true
  }
  if (topicsList.isFetching) {
    return false
  }
  return true
}

export const getTopicsListIfNeeded = (params: any): any => (dispatch: any, getState: any) => {
  if (shouldGetTopicsList(getState())) {
    return dispatch(getTopicsList(params));
  }
}
