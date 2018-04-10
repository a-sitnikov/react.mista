//@flow
import type { NewTopicAction } from '../actions/new_topic'

export type NewTopicState = {
    isFetching: boolean;
    text: string,
    forum: string,
    isVoting: boolean,
    error?: string
};

export const defaultNewTopicState = {
    isFetching: false,
    text: '',
    forum: '1C',
    isVoting: false
}

const newTopic = (state: NewTopicState = defaultNewTopicState, action: NewTopicAction) => {
    switch (action.type) {
        case 'POST_NEW_TOPIC_START':
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case 'POST_NEW_TOPIC_COMPLETE':
            return {
                ...state,
                isFetching: false
            }
       case 'POST_NEW_TOPIC_ERROR':
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case 'NEW_TOPIC_FORUM':
            return {
                ...state,
                forum: action.data
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