import { createAction } from '@reduxjs/toolkit'
import { ICoords, ITooltipKeys } from '.';
import { RootState } from '../store'

export const createTooltip = createAction('CREATE_TOOLTIP', (keys, coords) => ({
  payload: {
    keys,
    coords
  },
}));
export const closeTooltip = createAction('CLOSE_TOOLTIP', keys => ({
  payload: {
    keys
  },
}));
export const clearTooltips = createAction('CLEAR_TOOLTIPS');

export const showTooltip = (keys: ITooltipKeys, coords: ICoords): any => async (dispatch: any) => {
  dispatch(createTooltip(keys, coords));
}

export const clearTooltipsIfNeeded = (): any => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  if (state.tooltips.items.length > 0) {
    dispatch(clearTooltips());;
  }
}