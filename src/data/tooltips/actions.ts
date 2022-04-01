//@flow
import { createAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TooltipKeys = {
  type: 'TOPIC' | 'TOPIC_PREVIEW',
  topicId: string,
  number: number
}

export type Coords = {
  x: number,
  y: number
}

export type TooltipItem = {
  keys: TooltipKeys,
  coords: Coords
}

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

export const showTooltip = (keys: TooltipKeys, coords: Coords): any => async (dispatch: any) => {

  if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') {
    dispatch(createTooltip(keys, coords));
  }
}

export const clearTooltipsIfNeeded = (): any => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  if (state.tooltips.items.length > 0) {
    dispatch(clearTooltips());;
  }
}