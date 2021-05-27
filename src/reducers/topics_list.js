//@flow
import type { TopicsListAction } from 'src/actions/topics_list'
import type { ResponseTopicsListItem } from 'src/api'

import { REQUEST_TOPICS_LIST, RECEIVE_TOPICS_LIST, RECEIVE_TOPICS_LIST_FAILED, TOGGLE_PREVIEW } from 'src/actions/topics_list'

export type TopicsListItem = ResponseTopicsListItem & {
    showPreview?: ?boolean
}

export type TopicsListState = {
  isFetching: boolean;
  items: Array<TopicsListItem>,
  error?: ?string,
  lastUpdated?: Date
};

export const defaultTopicsListState: TopicsListState = {
    isFetching: false,
    items: []
}

const topicsList = (state: TopicsListState = defaultTopicsListState, action: TopicsListAction): TopicsListState => {

    switch (action.type) {
        case REQUEST_TOPICS_LIST:
            return {
                ...state,
                error: null,
                isFetching: true
            }
        case RECEIVE_TOPICS_LIST:
            return {
                ...state,
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt
            }
        case RECEIVE_TOPICS_LIST_FAILED:
            return {
                ...state,
                isFetching: false,
                error: action.error,
                lastUpdated: action.receivedAt
            }
        case TOGGLE_PREVIEW:
            let items = state.items.slice();
            const ind = items.findIndex(item => item.id === action.topicId);
            
            let item = Object.assign({}, items[ind]);
            item.showPreview = !item.showPreview;
            items[ind] = item;

            return {
                ...state,
                items
            }
        default:
            return state
    }
}

export default topicsList;