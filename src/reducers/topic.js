//@flow 
import type { ResponseInfo, ResponseMessages, ResponseMessage } from '../api'

type State = {
  isFetching: boolean;
  info: ResponseInfo,
  item0?: ResponseMessage,
  items: ResponseMessages,
  lastUpdated?: Date,
  error?: ?string
};

const defaultState = {
    isFetching: false,
    info: {answers_count: "0"},
    items: []
}

const topic = (state: State = defaultState, action: any) => {
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
        default:
            return state
    }
}

export default topic;