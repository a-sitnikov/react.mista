import { createAction } from '@reduxjs/toolkit'

import { fetchSections } from 'src/api/sections'
import { RootState } from '../store';

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

export const getSections = () => async (dispatch: any) => {

  dispatch(requestSections());

  try {
    
    const list = await fetchSections();
    dispatch(receiveSections(list));

  } catch (e) {

    dispatch(receiveSectionsFailed(e.message));
    console.error(e);

  }

}

const shouldGetSections = (state: RootState): boolean => {

  const sections = state.sections;

  if (!sections)
    return true

  if (sections.isFetching)
    return false

  if (sections.items.length > 0)
    return false;

  return true
}

export const getSectionsIfNeeded = (): any => (dispatch: any, getState: any) => {
  if (shouldGetSections(getState())) {
    return dispatch(getSections());
  }
}