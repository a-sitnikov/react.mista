//@flow
import { createReducer } from '@reduxjs/toolkit'
import { addMessageText, NewMessageAction, newMessageText, postNewMessageComplete, postNewMessageStart } from './actions'

export type NewMessageState = {
  isFetching: boolean;
  text: string
};

export const initialState: NewMessageState = {
  isFetching: false,
  text: ''
}

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
  })

export default reducer;