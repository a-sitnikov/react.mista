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
/*
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
*/
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