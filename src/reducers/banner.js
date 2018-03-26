
const banner = (state = {
    isFetching: false,
    banner: {}
}, action) => {
    switch (action.type) {
        case 'REQUEST_BANNER':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_BANNER':
            return {
                ...state,
                isFetching: false,
                banner: action.banner,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default banner;