const topicsList = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_TOPICS_LIST':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_TOPICS_LIST':
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

export default topicsList;