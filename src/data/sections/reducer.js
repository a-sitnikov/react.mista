//@flow 
import { createReducer } from '@reduxjs/toolkit'

import { requestSections, receiveSections } from './actions'
import type { ResponseSections } from 'src/api'

import { groupBy } from 'src/utils'

export type SectionsState = {
  isFetching: boolean;
  items: ResponseSections,
  tree: { [string]: any },
  map: { [string]: any },
  lastUpdated?: Date,
  error?: ?string
};

export const initialState: SectionsState = {
  isFetching: false,
  items: [],
  tree: {},
  map: {}
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requestSections, (state) => {
      state.isFetching = true
    })
    .addCase(receiveSections, (state, action) => {

      if (action.error) {
        state.error = action.payload.toString();
      } else {
        let map = {};
        action.payload.list.forEach(item => {
            map[val.code] = item.name
        });
        state.items = action.payload.list;
        state.tree = groupBy(state.items, item => item.forum);
        state.map = map;
        delete state.error;
      }
      state.lastUpdated = new Date().getTime();
      state.isFetching = false;
    })
})

export default reducer;
