import { createReducer } from '@reduxjs/toolkit'

import { postNewTopicStart, postNewTopicComplete, postNewTopicError, newTopicText, 
  newTopicClear, newTopicSubject, newTopicSection, newTopicShowVoting} from './actions'

import { initialState } from '.'

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(postNewTopicStart, (state) => {
      state.isFetching = true;
      delete state.error;
    })
    .addCase(postNewTopicComplete, (state) => {
      state.isFetching = false;
    })
    .addCase(postNewTopicError, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    })
    .addCase(newTopicText, (state, action) => {
      state.text = action.payload.text;
    })    
    .addCase(newTopicClear, (state) => {
      state.text = '';
      state.subject = '';
      state.isVoting = false;
    })    
    .addCase(newTopicSubject, (state, action) => {
      state.subject = action.payload.text;
    })    
    .addCase(newTopicShowVoting, (state, action) => {
      state.isVoting = action.payload.show;
    })   
    .addCase(newTopicSection, (state, action) => {
      state.section = action.payload.section;
      state.forum = action.payload.section == null ? '' : action.payload.section.forum.toLowerCase()
    })   
  })

export default reducer;