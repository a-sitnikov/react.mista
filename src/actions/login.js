import fetchJsonp from 'fetch-jsonp'
import Cookies from 'universal-cookie';

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

export const checkLogin = (params) => dispatch => {

    const cookies = new Cookies();
    const userid = cookies.get('entr_id');
    const username = cookies.get('entr_name');
    const hashkey = cookies.get('entr_hash');

    if (userid) {
        dispatch(loginComplete({
            error: "",
            userid,
            username,
            hashkey
        }));
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

        json = JSON.parse(json);
        if (!json.error) {
            const cookies = new Cookies();
            cookies.set('entr_id', json.userid, { path: '/' });
            cookies.set('entr_name', json.username, { path: '/' });
            cookies.set('entr_hash', json.hashkey, { path: '/' });
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