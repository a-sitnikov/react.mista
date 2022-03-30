//@flow
import { createReducer } from '@reduxjs/toolkit'
import { requestTopicsList, receiveTopicsList, clearTopicsList, togglePreview } from './actions'

import type { ResponseTopicsListItem } from 'src/api'

export type TopicsListItem = ResponseTopicsListItem & {
  showPreview?: ?boolean
}

export type TopicsListState = {
  isFetching: boolean;
  items: Array<TopicsListItem>,
  error?: ?string,
  lastUpdated?: Date
};

export const defaultTopicsListState: TopicsListState = {
  isFetching: false,
  items: []
}

const reducer = createReducer(defaultTopicsListState, (builder) => {
  builder
    .addCase(requestTopicsList, (state) => {
      state.isFetching = true
    })
    .addCase(receiveTopicsList, (state, action) => {

      if (action.error) {
        state.error = action.payload.toString();
      } else {
        state.items = action.payload.list;
        delete state.error;
      }
      state.lastUpdated = new Date().getTime();
      state.isFetching = false;
    })
    .addCase(clearTopicsList, (state) => {
      state.items = [];
      state.isFetching = false;
      delete state.error;
      delete state.lastUpdated;
    })
    .addCase(togglePreview, (state, action) => {
      let items = state.items.slice();
      const ind = items.findIndex(item => item.id === action.payload.id);

      let item = Object.assign({}, items[ind]);
      item.showPreview = !item.showPreview;
      items[ind] = item;
      state.items = items;
    })    
})

export default reducer;
