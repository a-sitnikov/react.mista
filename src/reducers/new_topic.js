
const newTopic = (state = {
    isFetching: false,
    isVoting: false
}, action) => {
    switch (action.type) {
        case 'POST_NEW_TOPIC_START':
            return {
                ...state,
                isFetching: true
            }
        case 'POST_NEW_TOPIC_COMPLETE':
            return {
                ...state,
                isFetching: false
            }
        case 'SHOW_VOTING':
            return {
                ...state,
                isVoting: action.data
            }
        default:
            return state
    }
}

export default newTopic;