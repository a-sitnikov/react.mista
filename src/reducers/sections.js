
const sections = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_SECTIONS':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_SECTIONS':
            return {
                ...state,
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default sections;