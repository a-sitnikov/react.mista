//@flow
import * as API from '../api'
import type { ResponseSections } from '../api'
import type { State } from '../reducers'

export type REQUEST_SECTIONS = {
    type: 'REQUEST_SECTIONS',
}

export type RECEIVE_SECTIONS = {
    type: 'RECEIVE_SECTIONS',
    items: ResponseSections,
    receivedAt: Date
}

export type SectionsAction = REQUEST_SECTIONS | RECEIVE_SECTIONS;

export const requestSections = (): REQUEST_SECTIONS => ({
    type: 'REQUEST_SECTIONS'
})

export const receiveSections = (json: ResponseSections): RECEIVE_SECTIONS => ({
    type: 'RECEIVE_SECTIONS',
    items: json,
    receivedAt: new Date()
})

export const fetchSections = () => async (dispatch: any) => {

    let action1 = requestSections();
    dispatch(action1);

    const json: ResponseSections = await API.getSections();
    
    let action2 = receiveSections(json);
    dispatch(action2);

}

const shouldfetchSections = (state: State): boolean => {
    
    const sections = state.sections;
    
    if (!sections) 
        return true
    
    if (sections.isFetching) 
        return false
    
    if (sections.items.length > 0)
        return false;

    return true
}

export const fetchSectionsIfNeeded = () => (dispatch: any, getState: any) => {
    if (shouldfetchSections(getState())) {
      return dispatch(fetchSections());
    }
  }