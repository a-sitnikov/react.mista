const defaultState = {
    isFetching: false,
    info: {},
    items: []
}

const topic = (state = defaultState, action) => {
    switch (action.type) {
        case 'REQUEST_TOPIC':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_TOPIC':
            return {
                ...state,
                isFetching: false,
                info: action.info,
                items: action.items,
                lastUpdated: action.receivedAt
            }
        case 'REQUEST_NEW_MESSAGES':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_NEW_MESSAGES':
            return {
                ...state,
                isFetching: false,
                items: state.items.concat(action.items),
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default topic;