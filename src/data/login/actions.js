//@flow
import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api'
import type { RequestLogin, ResponseLogin } from 'src/api'
import type { State } from 'src/reducers'

export const loginStart = createAction('LOGIN_START');
export const loginComplete = createAction('LOGIN_COMPLETE', (userid, username, hashkey) => ({
  payload: {
    userid,
    username,
    hashkey,
  },
  error: false
}));
export const loginFailed = createAction('LOGIN_COMPLETE', error => ({
  payload: error,
  error: true
}));

export const logoutStart = createAction('LOGOUT_START');
export const logoutComplete = createAction('LOGOUT_COMPLETE');

export const checkLoginStart = createAction('CHECK_LOGIN_START');

const shouldLogin = (state: State): boolean => {
  const { login } = state;
  if (!login) {
    return true
  }
  if (login.isFetching) {
    return false
  }
  return true
}

export const checkLogin = (params: any): any => async (dispatch: any) => {

  dispatch(checkLoginStart());

  let json;
  try {
    json = await API.getCookies();
  } catch (e) {
    dispatch(loginFailed(e));
    return;
  }
  const { cookie, session } = json;

  if (session && session.user_id){

    let error = (session.last_error || '').trim();
    if (error === 'Не указано сообщение.') error = '';
    dispatch(loginComplete(
      session.user_id,
      session.user_name,
      cookie.entr_hash
    ));
  } else
    dispatch(loginFailed(''));
}

export const checkLoginIfNeeded = (params: any): any => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(checkLogin(params))
  }
}

export const doLogout = (params: any): any => async (dispatch: any) => {

  dispatch(logoutStart());

  try {
    
    API.getLogout();

  } catch (e) {
    console.error(e);
  }
  
  dispatch(logoutComplete());
  dispatch(checkLogin());

}

export const doLogin = (params: RequestLogin): any => async (dispatch: any) => {

  dispatch(loginStart());

  try {

    await API.getLogin({
      username: encodeURIComponent(params.username),
      password: encodeURIComponent(params.password)
    })

    dispatch(checkLogin());

  } catch (err) {
    console.error('Login error :', err);
    dispatch(loginFailed(err.message));
  }

}

export const doLoginIfNeeded = (params: RequestLogin): any => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(doLogin(params))
  }
}