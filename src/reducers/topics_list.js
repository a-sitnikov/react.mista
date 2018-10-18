//@flow
import type { TopicsListAction } from 'src/actions/topics_list'

export type TopicsListState = {
  isFetching: boolean;
  items: any,
  error?: string,
  lastUpdated?: Date
};

export const defaultTopicsListState = {
    isFetching: false,
    items: []
}

const topicsList = (state: TopicsListState = defaultTopicsListState, action: TopicsListAction) => {

    switch (action.type) {
        case 'REQUEST_TOPICS_LIST':
            return {
                ...state,
                error: null,
                isFetching: true
            }
        case 'RECEIVE_TOPICS_LIST':
            return {
                ...state,
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt
            }
        case 'RECEIVE_TOPICS_LIST_FAILED':
            return {
                ...state,
                isFetching: false,
                error: action.error,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default topicsList;