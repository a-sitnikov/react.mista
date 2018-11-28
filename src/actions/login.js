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
    type: 'LOGIN_FAILED',
    error: string
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

export const loginFailed = (error: string): LOGIN_FAILED => {

    return {
        type: 'LOGIN_FAILED',
        error
    }
}

export const checkLoginStart = (): CHECK_LOGIN_START => {

    return {
        type: 'CHECK_LOGIN_START'
    }
}

export const logoutStart = (): LOGOUT_START => {

    return {
        type: 'LOGOUT_START'
    }
}

export const logoutComplete = (): LOGOUT_COMPLETE => {

    return {
        type: 'LOGOUT_COMPLETE'
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

    dispatch(checkLoginStart());

    let json;
    try {
        json = await API.getCookies();
    } catch(e) {
        dispatch(loginFailed(e.message));
        return;   
    }  
    const { cookie, session } = json;

    if (session && session.user_id) {
        dispatch(loginComplete({
            error: session.last_error,
            userid: session.user_id,
            username: session.user_name,
            hashkey: cookie.entr_hash
        }));
   } else  
        dispatch(loginFailed(''));
}

export const checkLoginIfNeeded = (params: any) => (dispatch: any, getState: any) => {
    if (shouldLogin(getState())) {
        return dispatch(checkLogin(params))
    }
}

export const doLogout = (params: any) => async (dispatch: any) => {

    dispatch(logoutStart());

    try {
        API.getLogout();
    } catch(e) {
        
        dispatch(logoutComplete());
        checkLogin();

    }    

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
        } else {
            dispatch(loginFailed(
                'ОШИБКА: Вход не выполнен! Возможно указан неверный пароль.'
                ));            
        }

    } catch (err) {
        console.error('Login error :', err);
        dispatch(loginFailed(err.message));           
    }

}

export const doLoginIfNeeded = (params: RequestLogin) => (dispatch: any, getState: any) => {
    if (shouldLogin(getState())) {
        return dispatch(doLogin(params))
    }
}