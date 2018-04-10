//@flow 
import type { SearchAction } from '../actions/search'

export type SearchState = {
  isFetching: boolean;
  items: Array<*>,
  lastUpdated?: Date
}

export const defaultSearchState = {
    isFetching: false,
    items: []
}

const search = (state: SearchState = defaultSearchState, action: SearchAction) => {
    switch (action.type) {
        case 'REQUEST_SEARCH':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_SEARCH_RESULTS':
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

export default search;