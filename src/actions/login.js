import fetchJsonp from 'fetch-jsonp'
import Cookies from 'universal-cookie';

import API from '../api'

export const loginStart = (json) => {

    return {
        type: 'LOGIN_START'
    }
}

export const loginComplete = (json) => {

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

export const checkLogin = (params) => async dispatch => {

    dispatch({
        type: 'CHECK_LOGIN_START'
    });

    const response = await fetchJsonp(API.cookies, {
        mode: 'no-cors',
        credentials: 'include'       
    });
    let json = await response.json();
    json = typeof(json) === 'string' ? JSON.parse(json) : json;

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

export const checkLoginIfNeeded = (params) => (dispatch, getState) => {
    if (shouldLogin(getState())) {
        return dispatch(checkLogin(params))
    }
}

export const doLogout = (params) => dispatch => {

    dispatch({
        type: 'LOGOUT_START'
    });

    const cookies = new Cookies();
    cookies.remove('entr_id');
    cookies.remove('entr_name');
    cookies.remove('entr_hash');

    dispatch({
        type: 'LOGOUT_COMPLETE'
    });

}

export const doLogin = (params) => async dispatch => {

    dispatch(loginStart());

    try {

        const response = await fetchJsonp(`{API.login}?username=${encodeURIComponent(params.username)}&password=${params.password}`)
        let json = await response.json();

        json = typeof(json) === 'string' ? JSON.parse(json) : json;
        if (!json.error) {
            dispatch(loginComplete(json));
            /*
            const cookies = new Cookies();
            cookies.set('entr_id', json.userid, { path: '/' });
            cookies.set('entr_name', json.username, { path: '/' });
            cookies.set('entr_hash', json.hashkey, { path: '/' });
            */
        }
        dispatch(loginComplete(json));

    } catch (err) {
        console.error('Login error :', err);
    }

}

export const doLoginIfNeeded = (params) => (dispatch, getState) => {
    if (shouldLogin(getState())) {
        return dispatch(doLogin(params))
    }
}