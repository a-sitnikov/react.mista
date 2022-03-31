//@flow
import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api'
import type { RequestNewTopic } from 'src/api'
import type { State } from 'src/reducers'
import type { ResponseSection } from 'src/api'

export type postNewTopicParams = {
  subject: string,
  text: string,
  section: number,
  forum: string,
  isVoting: boolean,
  votingItems?: Array<string>,
  onSuccess?: () => void
};

export const postNewTopicStart = createAction('POST_NEW_TOPIC_START');
export const postNewTopicComplete = createAction('POST_NEW_TOPIC_COMPLETE');
export const postNewTopicError = createAction('POST_NEW_TOPIC_ERROR', error => ({
  payload: error,
  error: true
}));
export const newTopicText = createAction('NEW_TOPIC_TEXT', text => ({
  payload: {
    text
  },
  error: false
}));
export const newTopicClear = createAction('NEW_TOPIC_CLEAR');
export const newTopicSubject = createAction('NEW_TOPIC_SUBJECT', text => ({
  payload: {
    text
  },
  error: false
}));
export const newTopicSection = createAction('NEW_TOPIC_SECTION', section => ({
  payload: {
    section
  },
  error: false
}));
export const newTopicShowVoting = createAction('SHOW_VOTING', show => ({
  payload: {
    show
  },
  error: false
}));

export const shouldPostNewTopic = (state: State): boolean => {
  const newTopic = state.newTopic;
  if (!newTopic) {
    return false
  }
  if (newTopic.isFetching) {
    return false
  }
  return true
}

export const postNewTopicIfNeeded = (params: postNewTopicParams): any => (dispatch: any, getState: any) => {
  if (shouldPostNewTopic(getState())) {
    return dispatch(postNewTopic(params));
  }
}

const postNewTopic = (params: postNewTopicParams) => async (dispatch: any) => {

  dispatch(postNewTopicStart());

  let fetchParams: RequestNewTopic = {
    message_text: encodeURIComponent(params.text),
    topic_text: encodeURIComponent(params.subject),
    target_section: String(params.section),
    target_forum: params.forum.toLowerCase(),
    action: 'new',
    rnd: Math.round(Math.random() * 10000000000),
    voting: params.isVoting ? 1 : 0
  };

  if (params.votingItems)
    for (let i = 0; i < params.votingItems.length; i++) {
      fetchParams[`section${i + 1}`] = params.votingItems[i];
    }

  await API.postNewTopic(fetchParams);

  dispatch(postNewTopicComplete());

  if (params.onSuccess)
    params.onSuccess();
}