//@flow
import * as API from '../api'
import type { RequestSearch, ResponseSearch } from '../api'
import type { State } from '../reducers'

export type REQUEST_SEARCH = {
    type: 'REQUEST_SEARCH',
}

export type RECEIVE_SEARCH_RESULTS = {
    type: 'RECEIVE_SEARCH_RESULTS',
    items: ResponseSearch,
    receivedAt: Date
}

export type SearchAction = REQUEST_SEARCH | RECEIVE_SEARCH_RESULTS;

const shouldFetch = (state: State): boolean => {
    const { search } = state;
    if (!search) {
        return true
    }
    if (search.isFetching) {
        return false
    }
    return true
}

export const doSearch = (params: RequestSearch): any => async (dispatch: any) => {

    let action1: REQUEST_SEARCH = {
        type: 'REQUEST_SEARCH'
    };
    dispatch(action1);

    await API.postSearch(params);

}

export const doSearchIfNeeded = (params: RequestSearch): any => (dispatch: any, getState: any) => {
    if (shouldFetch(getState())) {
        return dispatch(doSearch(params))
    }
}
