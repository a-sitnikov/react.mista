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

export const defaultLoginState: LoginState = {
    isFetching: false,
    logged: undefined
}

const login = (state: LoginState = defaultLoginState, action: LoginAction): LoginState => {
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
                error: null,
                ...action.data
            }
         case 'LOGIN_FAILED':
            return {
                isFetching: false,
                logged: false,
                error: action.error
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