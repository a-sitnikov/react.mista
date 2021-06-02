//@flow
import type { State } from '../reducers'

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

export type CREATE_TOOLTIP = {
  type: 'CREATE_TOOLTIP',
} & TooltipItem

export type CLEAR_TOOLTIPS = {
  type: 'CLEAR_TOOLTIPS',
}

export type CLOSE_TOOLTIP = {
  type: 'CLOSE_TOOLTIP',
  keys: TooltipKeys
}

export type TooltipsAction = CREATE_TOOLTIP | CLOSE_TOOLTIP | CLEAR_TOOLTIPS;

export const showTooltip = (keys: TooltipKeys, coords: Coords): any => async (dispatch: any) => {

  if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') {

    const action: CREATE_TOOLTIP = {
      type: 'CREATE_TOOLTIP',
      keys,
      coords
    }
    dispatch(action);

  }
}

export const closeTooltip = (keys: TooltipKeys): any => (dispatch: any) => {
  dispatch({
    type: 'CLOSE_TOOLTIP',
    keys
  });
}

export const clearTooltipsIfNeeded = (): any => (dispatch: any, getState: any) => {
  const state: State = getState();
  if (state.tooltips.items.length > 0) {

    const action: CLEAR_TOOLTIPS = {
      type: 'CLEAR_TOOLTIPS'
    };

    dispatch(action);
  }
}