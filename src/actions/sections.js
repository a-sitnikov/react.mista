//@flow
import * as API from '../api'
import type { ResponseSections } from '../api'
import { groupBy } from '../utils'

export const requestSections = () => ({
    type: 'REQUEST_SECTIONS'
})

export const receiveSections = (json: ResponseSections) => ({
    type: 'RECEIVE_SECTIONS',
    items: json,
    tree: groupBy(json, 'forum'),
    receivedAt: Date.now()
})

export const fetchSections = (params: any) => async (dispatch: any) => {

    dispatch(requestSections());

    const json: ResponseSections = await API.getSections();
    
    dispatch(receiveSections(json));

}

const shouldfetchSections = (state) => {
    
    const sections = state.sections;
    
    if (!sections) 
        return true
    
    if (sections.isFetching) 
        return false
    
    if (sections.items.length > 0)
        return false;

    return true
}

export const fetchSectionsIfNeeded = (params: any) => (dispatch: any, getState: any) => {
    if (shouldfetchSections(getState())) {
      return dispatch(fetchSections(params));
    }
  }