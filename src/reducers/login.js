const login = (state = {}, action) => {
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