//@flow 
import type { LoginAction } from 'src/actions/login'

export type LoginState = {
  isFetching: boolean;
  userid?: string,
  username?: string,
  hashkey?: string,
  error?: string
};

export const defaultLoginState = {
    isFetching: false
}

const login = (state: LoginState = defaultLoginState, action: LoginAction) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isFetching: true
            }
        case 'LOGIN_COMPLETE':
            return {
                ...state,
                isFetching: false,
                ...action.data
            }
        case 'LOGOUT_COMPLETE':
            return {
                ...state,
                userid: undefined,
                username: undefined,
                hashkey: undefined
            }
        default:
            return state
    }
}

export default login;