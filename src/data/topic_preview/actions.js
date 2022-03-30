//@flow
import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api/topic'
import type { ResponseMessage } from 'src/api'

export type PreviewTextParams = {
  topicId: string,
  n: number
}

export const showPreview = createAction('SHOW_PREVIEW', topicId => ({
  payload: {
    topicId   
  }
}));
export const closePreview = createAction('CLOSE_PREVIEW', topicId => ({
  payload: {
    topicId   
  }
}));
export const requestPreviewText = createAction('REQUEST_PREVIEW_TEXT', topicId => ({
  payload: {
    topicId   
  }
}));
export const recievePreviewText = createAction('RECEIVE_PREVIEW_TEXT', topicId => ({
  payload: {
    topicId,
    message   
  }
}));

export const fetchTopicPreviewText = (params: PreviewTextParams): any => async (dispatch: any) => {

  dispatch(requestPreviewText(params.topicId));

  const json = await API.getMessage(params.topicId, params.n);

  if (json.length > 0)
    dispatch(recievePreviewText(params.topicId, json[0]));
}