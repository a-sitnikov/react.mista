import { createReducer } from '@reduxjs/toolkit'
import { defaultInfo, initialState } from '.';

import { requestTopic, receiveTopic, clearTopicMessages, requestNewMessages, receiveNewMessages } from './actions'

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requestTopic, (state) => {
      state.isFetching = true
    })
    .addCase(receiveTopic, (state, action) => {

      if (action.error) {
        state.error = action.payload.toString();
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
      state.items = [];
      state.info = defaultInfo;
      delete state.item0;
      delete state.error;
    })
    .addCase(requestNewMessages, (state) => {
      state.isFetching = true
    })
    .addCase(receiveNewMessages, (state, action) => {
      if (action.error) {
        state.error = action.payload.toString();
      } else {
        state.isFetching = false;
        if (action.payload.list.length > 0) {
          state.items = state.items.concat(action.payload.list);
          state.info.count = state.items[state.items.length - 1].n;
        }  
      }
    })
})

export default reducer;