//@flow
import type { NewTopicAction } from '../actions/new_topic'
import type { ResponseSection } from 'src/api'

export type NewTopicState = {
    isFetching: boolean;
    section: ?ResponseSection,
    text: string,
    subject: string,
    forum: string,
    isVoting: boolean,
    error?: string
};

export const defaultNewTopicState = {
    isFetching: false,
    section: null,
    text: '',
    subject: '',
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
        case 'NEW_TOPIC_SECTION':
            return {
                ...state,
                section: action.section,
                forum: action.section == null ? '' : action.section.forum.toLowerCase()
            }
        case 'NEW_TOPIC_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'NEW_TOPIC_SUBJECT':
            return {
                ...state,
                subject: action.text
            }
        case 'NEW_TOPIC_CLEAR':
            return {
                ...state,
                text: '',
                subject: '',
                isVoting: false
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