import { createAction } from '@reduxjs/toolkit'

import { fetchCookies } from 'src/api/cookies';
import { fetchLogin, fetchLogout } from 'src/api/login'
import { RootState } from '../store';

export const loginStart = createAction('LOGIN_START');
export const loginComplete = createAction('LOGIN_COMPLETE', (userId, userName, userHash) => ({
  payload: {
    userId,
    userName,
    userHash,
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

const shouldLogin = (state: RootState): boolean => {
  const { login } = state;
  if (!login) {
    return true
  }
  if (login.isFetching) {
    return false
  }
  return true
}

export const checkLogin = () => async (dispatch: any) => {

  dispatch(checkLoginStart());

  let json;
  try {
    json = await fetchCookies();
  } catch (e) {
    dispatch(loginFailed(e));
    return;
  }
 
  if (json && json.userId){

    let error = (json.lastError || '').trim();
    if (error === 'Не указано сообщение.') error = '';
    dispatch(loginComplete(
      json.userId,
      json.userName,
      json.userHash
    ));
  } else
    dispatch(loginFailed(''));
}

export const checkLoginIfNeeded = () => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(checkLogin())
  }
}

export const doLogout = () => async (dispatch: any) => {

  dispatch(logoutStart());

  try {
    await fetchLogout();
  } catch (e) {
    console.error(e);
  }
  
  dispatch(logoutComplete());
  dispatch(checkLogin());

}

export const doLogin = (params: any): any => async (dispatch: any) => {

  dispatch(loginStart());

  try {

    await fetchLogin({
      username: encodeURIComponent(params.username),
      password: encodeURIComponent(params.password)
    })

    dispatch(checkLogin());

  } catch (err) {
    console.error('Login error :', err);
    dispatch(loginFailed(err.message));
  }

}

export const doLoginIfNeeded = (params: any): any => (dispatch: any, getState: any) => {
  if (shouldLogin(getState())) {
    return dispatch(doLogin(params))
  }
}