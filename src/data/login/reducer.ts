import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { initialState, ILogin } from '.';

import { fetchLogin, fetchLogout, IRequest } from 'src/api/login'
import { fetchCookies } from 'src/api/cookies'

import { RootState } from '../store';

export const checkLogin = createAsyncThunk(
  'login/check',
  async () => {

    return await fetchCookies();

  }
)

export const doLogin = createAsyncThunk(
  'login/login',
  async (params: IRequest, { dispatch }) => {

    await fetchLogin(params);
    return fetchCookies();

  }
)

export const doLogout = createAsyncThunk(
  'login/logout',
  async () => {

    return await fetchLogout();

  }
)

const shouldLogin = ({ login }: RootState): boolean => {
 
  if (!login) return true;
  if (login.status === "loading") return false;
  
  return true;
}

export const doLoginIfNeeded = (username: string, password: string): any => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(doLogin({ username, password }))
  }
}

export const checkLoginIfNeeded = (): any => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(checkLogin())
  }
}

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })    
      .addCase(doLogin.fulfilled, (state, { payload }: PayloadAction<ILogin>) => {
        state.status = "success";
        state.userId = payload.userId;
        state.userName = payload.userName;
        state.userHash = payload.userHash;
        state.logged = true;
        delete state.error;
      })   
      .addCase(doLogin.rejected, (state) => {
        state.status = "error";
        delete state.error;
      })   
      // logout
      .addCase(doLogout.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })    
      .addCase(doLogout.fulfilled, (state) => {
        state.status = "success";
        state.logged = false;

        delete state.userId;
        delete state.userName;
        delete state.userHash;
        delete state.error;
      })   
      .addCase(doLogout.rejected, (state) => {
        state.status = "error";
        delete state.error;
      }) 
  }
})  

export default slice;