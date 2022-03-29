//@flow 
import { createReducer } from '@reduxjs/toolkit'
import { defaultInfo } from 'src/api'
import type { ResponseInfo, ResponseMessages, ResponseMessage } from 'src/api'
import type { TopicAction } from 'src/data/topic/actions'

import { requestTopic, receiveTopic, clearTopicMessages, requestNewMessages, receiveNewMessages } from './actions'

export type TopicState = {
  isFetching: boolean;
  info: ResponseInfo,
  item0?: ?ResponseMessage,
  items: ResponseMessages,
  lastUpdated?: ?Date,
  error?: ?string
};

export const defaultTopicState: TopicState = {
  isFetching: false,
  info: defaultInfo,
  items: []
}

const reducer = createReducer(defaultTopicState, (builder) => {
  builder
    .addCase(requestTopic, (state) => {
      state.isFetching = true
    })
    .addCase(receiveTopic, (state, action) => {

      if (action.error) {
        state.error = action.error.toString();
      } else {
        state.items = action.payload.list;
        state.item0 = action.payload.item0;
        state.info = action.payload.info;
        delete state.error;
      }
      state.lastUpdated = new Date().getTime();
      state.isFetching = false;
    })
    .addCase(clearTopicMessages, (state) => {
      state.items = defaultTopicState.items;
      state.item0 = defaultTopicState.item0;
      state.info = defaultTopicState.info;
      delete state.error;
    })
    .addCase(requestNewMessages, (state) => {
      state.isFetching = true
    })
    .addCase(receiveNewMessages, (state, action) => {
      if (action.error) {
        state.error = action.error.toString();
      } else {
        state.isFetching = false;
        state.items = state.items.concat(action.payload.list);
      }
    })
})

export default reducer;