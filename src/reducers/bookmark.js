//@flow
import type { AddBookmarkAction } from '../actions/bookmark'

export type BookmarkState = {
  isFetching: boolean
};

export const defaultBookmarkState = {
  isFetching: false
};

const bookmark = (state: BookmarkState = defaultBookmarkState, action: AddBookmarkAction) => {
    switch (action.type) {
        case 'ADD_BOOKMARK_START':
            return {
                ...state,
                isFetching: true
            }
        case 'ADD_BOOKMARK_COMPLETE':
        case 'ADD_BOOKMARK_FAIL':
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

export default bookmark;