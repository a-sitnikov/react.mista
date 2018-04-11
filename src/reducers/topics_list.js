//@flow
import type { TopicsListAction } from '../actions/topics_list'

export type TopicsListState = {
  isFetching: boolean;
  items: any,
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