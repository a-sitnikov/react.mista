//@flow 
import type { LoginAction } from 'src/actions/login'

export type LoginState = {
  isFetching: boolean;
  logged: ?boolean,
  userid?: string,
  username?: string,
  hashkey?: string,
  error?: string
};

export const defaultLoginState = {
    isFetching: false,
    logged: undefined
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
                logged: true,
                ...action.data
            }
         case 'LOGIN_FAILED':
            return {
                isFetching: false,
                logged: false,
            }
        case 'LOGOUT_COMPLETE':
            return {
                ...state,
                userid: undefined,
                username: undefined,
                hashkey: undefined,
                logged: false
            }
        default:
            return state
    }
}

export default login;