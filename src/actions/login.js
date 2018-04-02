//@flow
import * as API from '../api'
import type { RequestLogin, ResponseLogin } from '../api'

export const loginStart = (json: any) => {

    return {
        type: 'LOGIN_START'
    }
}

export const loginComplete = (json: ResponseLogin) => {

    return {
        type: 'LOGIN_COMPLETE',
        data: json
    }
}

const shouldLogin = (state) => {
    const login = state.login;
    if (!login) {
        return true
    }
    if (login.isFetching) {
        return false
    }
    return true
}

export const checkLogin = (params: any) => async (dispatch: any) => {

    dispatch({
        type: 'CHECK_LOGIN_START'
    });

    const json = await API.getCookies();
    const { cookie, session } = json;

    if (session && session.user_id) {
        dispatch(loginComplete({
            error: "",
            userid: session.user_id,
            username: session.user_name,
            hashkey: cookie.entr_hash
        }));
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

    dispatch({
        type: 'LOGOUT_COMPLETE'
    });

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