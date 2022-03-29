//@flow
import { createAction } from '@reduxjs/toolkit'

import * as API from 'src/api'
import type { ResponseSections } from 'src/api'
import type { State } from 'src/reducers'

export const requestSections = createAction('REQUEST_SECTIONS');
export const receiveSections = createAction('RECEIVE_SECTIONS', list => ({
  payload: {
    list,
  },
  error: false
}));

export const receiveSectionsFailed = createAction('RECEIVE_SECTIONS', error => ({
  payload: error,
  error: true
}));

export const fetchSections = (): any => async (dispatch: any) => {

  dispatch(requestSections);

  try {
    
    const list: ResponseSections = await API.getSections();
    dispatch(receiveSections(list));

  } catch (e) {

    dispatch(receiveSectionsFailed(e));
    console.error(e);

  }

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

export const fetchSectionsIfNeeded = (): any => (dispatch: any, getState: any) => {
  if (shouldfetchSections(getState())) {
    return dispatch(fetchSections());
  }
}