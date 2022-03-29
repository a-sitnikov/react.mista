//@flow 
import { createReducer } from '@reduxjs/toolkit'
import { loginStart, loginComplete, logoutStart, logoutComplete, checkLoginStart } from './actions'

export type LoginState = {
  isFetching: boolean;
  logged: any,
  userid?: string,
  username?: string,
  hashkey?: string,
  error?: string
};

export const defaultLoginState: LoginState = {
  isFetching: false,
  logged: undefined
}

const reducer = createReducer(defaultLoginState, (builder) => {
  builder
    .addCase(loginStart, (state) => {
      state.isFetching = true;
    })
    .addCase(loginComplete, (state, action) => {
      if (action.error) {
        state.logged = false;
        state.error = action.payload.toString();
      } else {

        state.userid = action.payload.userid;
        state.username = action.payload.username;
        state.hashkey = action.payload.hashkey;
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
      delete state.userid;
      delete state.username;
      delete state.hashkey;
      delete state.error;
    })    
})

export default reducer;
