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
        default:
            return state
    }
}

export default login;