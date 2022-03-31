import { createReducer } from '@reduxjs/toolkit'

import { requestSections, receiveSections } from './actions'
import { groupBy } from 'src/utils'
import { initialState } from '.'

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
            map[item.code] = item.name
        });
        state.items = action.payload.list;
        state.tree = groupBy(state.items, item => item.forum);
        delete state.error;
      }
      state.lastUpdated = new Date().getTime();
      state.isFetching = false;
    })
})

export default reducer;
