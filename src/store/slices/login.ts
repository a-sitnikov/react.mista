import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { fetchLogin, fetchLogout, ILoginRequest } from 'src/api'
import { fetchCookies } from 'src/api'

import { RootState } from '../types';

export interface ILogin {
  userId?: number;
  userName?: string,
  userHash?: string,
  lastError?: string,
}

export interface ILoginState {
  status: "init" | "loading" | "success" | "error",
  logged: boolean,
  userId?: number,
  userName?: string,
  userHash?: string,
  lastError?: string,
  error?: string,
  lastUpdated?: number,
  isFetching?: boolean,
}

const initialState: ILoginState = {
  status: "init",
  logged: false
}

export const checkLogin = createAsyncThunk(
  'login/check',
  async () => {

    return await fetchCookies();

  }
)

export const doLogin = createAsyncThunk(
  'login/login',
  async (params: ILoginRequest, { dispatch }) => {

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
      .addCase(doLogin.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
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
      .addCase(doLogout.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
      }) 
  }
})  

export const { actions: loginActions, reducer: login } = slice;