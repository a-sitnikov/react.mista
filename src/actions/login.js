import fetchJsonp from 'fetch-jsonp'
import Cookies from 'universal-cookie';

export const loginStart = (json) => {

    return {
        type: 'LOGIN_START'
    }
}

export const loginCompleted = (json) => {

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
    const userid   = cookies.get('entr_id');
    const username = cookies.get('entr_name');
    const hashkey  = cookies.get('entr_hash');
    
    if (userid) {
        dispatch(loginCompleted({
            error: "",
            userid,
            username,
            hashkey
        }));
    }
}

export const doLogin = (params) => dispatch => {

    fetchJsonp('https://forum.mista.ru/ajax_login.php?username=Вафель&password=123456')
        .then(response => response.json())
        .then(json => {

            json = JSON.parse(json);
            if (!json.error) {
                const cookies = new Cookies();
                cookies.set('entr_id',   json.userid,   { path: '/' });
                cookies.set('entr_name', json.username, { path: '/' });
                cookies.set('entr_hash', json.hashkey,  { path: '/' });
            }
                    
            dispatch(loginCompleted(json));
        })

}

export const doLoginIfNeeded = (params) => (dispatch, getState) => {
    if (shouldLogin(getState())) {
        return dispatch(doLogin(params))
    }
}