
const newTopic = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case 'POST_NEW_MESSAGE_START':
            return {
                ...state,
                isFetching: true
            }
        case 'POST_NEW_MESSAGE_COMPLETE':
            return {
                ...state,
                isFetching: false
            }
        case 'NEW_MESSAGE_TEXT':
            return {
                ...state,
                text: action.text
            }
        default:
            return state
    }
}

export default newTopic;