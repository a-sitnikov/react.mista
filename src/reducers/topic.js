//@flow 
import { defaultInfo } from 'src/api'
import type { ResponseInfo, ResponseMessages, ResponseMessage } from 'src/api'
import type { TopicAction } from 'src/actions/topic'

export type TopicState = {
  isFetching: boolean;
  info: ResponseInfo,
  item0?: ResponseMessage,
  items: ResponseMessages,
  lastUpdated?: Date,
  error?: ?string
};

export const defaultTopicState = {
    isFetching: false,
    info: defaultInfo,
    items: []
}

const topic = (state: TopicState = defaultTopicState, action: TopicAction) => {
    switch (action.type) {
        case 'REQUEST_TOPIC':
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case 'RECEIVE_TOPIC':
            return {
                ...state,
                isFetching: false,
                info: action.info,
                item0: action.item0,
                items: action.items,
                lastUpdated: action.receivedAt,
                error: null
            }
        case 'RECEIVE_TOPIC_FAILED':
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.receivedAt,
                error: action.error
            }
        case 'REQUEST_NEW_MESSAGES':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_NEW_MESSAGES':

            let info = state.info;
            if (action.items.length > 0) {
                info.answers_count = action.items[action.items.length - 1].n;
            }

            return {
                ...state,
                isFetching: false,
                items: state.items.concat(action.items),
                info,
                lastUpdated: action.receivedAt
            }

        case 'CLOSE_TOPIC': 
        
            return {
                ...state,
                items: [],
                info: defaultInfo,
                item0: null,
                lastUpdated: null,
                error: null            
            }
        default:
            return state
    }
}

export default topic;