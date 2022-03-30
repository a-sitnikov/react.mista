//@flow
import { createReducer } from '@reduxjs/toolkit'

import { showPreview, closePreview, requestPreviewText, recievePreviewText } from './actions'

export type TopicPreviewState = {
  items: { [string]: ResponseMessage | null }
};

export const defaultTopicPreviewState: TopicPreviewState = {
  items: {}
};

const reducer = createReducer(defaultTopicPreviewState, (builder) => {
  builder
    .addCase(showPreview, (state, action) => {
      let previewItem = state[action.topicId];
      if (previewItem === undefined)
        state.items[action.topicId] = {
          n: '0',
          id: action.topicId,
          text: '',
          user: '',
          userId: '',
          utime: '0',
          vote: 0
        };
    })
    .addCase(closePreview, (state, action) => {
      delete state.items[action.topicId];
    })
    .addCase(requestPreviewText, (state, action) => {

    })
    .addCase(recievePreviewText, (state, action) => {
      let previewItem = state.items[action.topicId];
      if (previewItem === undefined)
        return state;
      else
        state.items[action.topicId] = action.message;
    })
  })    

export default reducer;