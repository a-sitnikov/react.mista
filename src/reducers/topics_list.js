//@flow
import type { TopicsListAction } from '../actions/topics_list'

export type TopicsListState = {
  isFetching: boolean;
  items: any,
  lastUpdated?: Date,
  previewItems: {}
};

export const defaultTopicsListState = {
    isFetching: false,
    items: [],
    previewItems: {}
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
         case 'SHOW_PREVIEW':

            let previewItem = state.previewItems[action.topicId];
            if (previewItem === undefined)
                state.previewItems[action.topicId] = {n: 0, text: ''};    
            return {
                ...state,
            }
         case 'CLOSE_PREVIEW': {
            delete state.previewItems[action.topicId];
            return {
                ...state
            }
         }
         default:
            return state
    }
}

export default topicsList;