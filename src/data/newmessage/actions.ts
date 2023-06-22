import { createAction } from '@reduxjs/toolkit'
import { fetchNewMessage, INewMessageRequest } from 'src/api'

export const postNewMessageStart = createAction('POST_NEW_MESSAGE_START');
export const postNewMessageComplete = createAction('POST_NEW_MESSAGE_COMPLETE');
export const newMessageText = createAction('NEW_MESSAGE_TEXT', text => ({
  payload: {
    text,
  }
}));
export const addMessageText = createAction('ADD_MESSAGE_TEXT', text => ({
  payload: {
    text,
  }
}));

export type PostNewmessageParams = {
  text: string,
  topicId: string,
  voting_select?: number,
  onSuccess?: () => void
}

export const postNewMessage = (params: PostNewmessageParams): any => async (dispatch: any) => {

  dispatch(postNewMessageStart());

  let fetchParams: INewMessageRequest = {
    message_text: params.text,
    action: "new",
    topic_id: params.topicId,
    rnd: Math.round(Math.random() * 10000000000)
  };

  if (params.voting_select)
    fetchParams.voting_select = params.voting_select;

  try {
    await fetchNewMessage(fetchParams);
    await dispatch(postNewMessageComplete());
    if (params.onSuccess)
      params.onSuccess();

  } catch (err) {
    console.error("Failed to post new message: " + err);
  }
}
