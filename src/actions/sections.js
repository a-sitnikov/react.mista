import fetchJsonp from 'fetch-jsonp'
import API from '../api'
import { groupBy } from '../utils'

export const requestSections = () => ({
    type: 'REQUEST_SECTIONS'
})

export const receiveSections = (json) => ({
    type: 'RECEIVE_SECTIONS',
    items: json,
    tree: groupBy(json, 'forum'),
    receivedAt: Date.now()
})

export const fetchSections = (params) => dispatch => {

    dispatch(requestSections());

    fetchJsonp(API.sections) 
        .then(response => response.json())
        .then(json => {
            const data = typeof(json) === 'string' ? JSON.parse(json) : json;
            dispatch(receiveSections(data));
        });
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

export const fetchSectionsIfNeeded = (params) => (dispatch, getState) => {
    if (shouldfetchSections(getState())) {
      return dispatch(fetchSections(params));
    }
  }