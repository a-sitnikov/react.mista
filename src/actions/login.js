//@flow
import * as API from 'src/api'
import type { RequestLogin, ResponseLogin } from 'src/api'
import type { State } from 'src/reducers'

export type LOGIN_START = {
    type: 'LOGIN_START',
}

export type LOGIN_COMPLETE = {
    type: 'LOGIN_COMPLETE',
    data: {
        error: string,
        userid: string,
        username: string,
        hashkey: string        
    }
}

export type CHECK_LOGIN_START = {
    type: 'CHECK_LOGIN_START'
}

export type LOGOUT_START = {
    type: 'LOGOUT_START'
}

export type LOGOUT_COMPLETE = {
    type: 'LOGOUT_COMPLETE'
}

export type LOGIN_FAILED = {
    type: 'LOGIN_FAILED'
}


export type LoginAction = LOGIN_START | LOGIN_COMPLETE | LOGIN_FAILED | CHECK_LOGIN_START | LOGOUT_START | LOGOUT_COMPLETE;

export const loginStart = (): LOGIN_START => {

    return {
        type: 'LOGIN_START'
    }
}

export const loginComplete = (json: ResponseLogin): LOGIN_COMPLETE => {

    return {
        type: 'LOGIN_COMPLETE',
        data: json
    }
}

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

export const checkLogin = (params: any) => async (dispatch: any) => {

    let action1: CHECK_LOGIN_START = {
        type: 'CHECK_LOGIN_START'
    };
    dispatch(action1);

    const json = await API.getCookies();
    const { cookie, session } = json;

    if (session && session.user_id) {
        
        let action2: LOGIN_COMPLETE = loginComplete({
            error: "",
            userid: session.user_id,
            username: session.user_name,
            hashkey: cookie.entr_hash
        });
        dispatch(action2);
   } else {
       dispatch({type: "LOGIN_FAILED"})
   }
}

export const checkLoginIfNeeded = (params: any) => (dispatch: any, getState: any) => {
    if (shouldLogin(getState())) {
        return dispatch(checkLogin(params))
    }
}

export const doLogout = (params: any) => async (dispatch: any) => {

    dispatch({
        type: 'LOGOUT_START'
    });

    API.getLogout();

    dispatch({
        type: 'LOGOUT_COMPLETE'
    });

    checkLogin();

}

export const doLogin = (params: RequestLogin) => async (dispatch: any) => {

    dispatch(loginStart());

    try {

        const json = await API.getLogin({
            username: encodeURIComponent(params.username),
            password: encodeURIComponent(params.password)    
        })
        if (!json.error) {
            dispatch(loginComplete(json));
        }
        dispatch(loginComplete(json));

    } catch (err) {
        console.error('Login error :', err);
    }

}

export const doLoginIfNeeded = (params: RequestLogin) => (dispatch: any, getState: any) => {
    if (shouldLogin(getState())) {
        return dispatch(doLogin(params))
    }
}