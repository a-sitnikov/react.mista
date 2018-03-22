const bookmark = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_BOOKMARK_START':
            return {
                ...state,
                isFetching: true
            }
        case 'ADD_BOOKMARK_COMPLETE':
        case 'ADD_BOOKMARK_FAIL':
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

export default bookmark;