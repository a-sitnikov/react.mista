import { createReducer } from '@reduxjs/toolkit'
import { initialState } from '.';
import { addMessageText, newMessageText, postNewMessageComplete, postNewMessageStart } from './actions'

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(postNewMessageStart, (state) => {
      state.isFetching = true;
    })
    .addCase(postNewMessageComplete, (state) => {
      state.isFetching = false;
    })  
    .addCase(newMessageText, (state, action) => {
      state.text = action.payload.text;
    })  
    .addCase(addMessageText, (state, action) => {
      state.text += action.payload.text;
    })  
    // .addCase(clearTopicMessages, (state) => {
    //   state.text = '';
    // })              
  })

export default reducer;