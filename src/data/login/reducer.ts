import { createReducer } from '@reduxjs/toolkit'
import { initialState } from '.';
import { loginStart, loginComplete, logoutStart, logoutComplete, checkLoginStart } from './actions'

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginStart, (state) => {
      state.isFetching = true;
    })
    .addCase(checkLoginStart, (state) => {
      state.isFetching = true;
    })    
    .addCase(loginComplete, (state, action) => {
      if (action.error) {
        state.logged = false;
        state.error = action.payload.toString();
      } else {

        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.userHash = action.payload.userHash;
        state.logged = true;
        delete state.error;
      }
      state.lastUpdated = new Date().getTime();
      state.isFetching = false;
    })
    .addCase(logoutStart, (state) => {
      state.isFetching = true;
    })
    .addCase(logoutComplete, (state) => {
      state.isFetching = false;
      state.logged = false;
      delete state.userId;
      delete state.userName;
      delete state.userHash;
      delete state.error;
    })    
})

export default reducer;
