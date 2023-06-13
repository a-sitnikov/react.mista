import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ITooltipKeys, ICoords, ITooltipsState, initialState } from '.';

const show = (state: ITooltipsState, action: PayloadAction<{ keys: ITooltipKeys; coords: ICoords}>) => {
  const hash = JSON.stringify(action.payload.keys);
  const index = state.items.findIndex(item => item.hash === hash);
  let zIndex = 0;
  if (state.items.length)
    zIndex = state.items[state.items.length - 1].zIndex + 1;
  if (index === - 1)
    state.items.push({
      keys: action.payload.keys,
      coords: action.payload.coords,
      hash,
      zIndex 
    })
  else {
    //state.list = moveToEnd(state.list, index);
    state.items[state.items.length - 1].zIndex = zIndex;
  }
}

const tooltipsSlice = createSlice({
  name: 'tooltips',
  initialState,
  reducers: {
    show,
    close: (state, action: PayloadAction<ITooltipKeys>) => {
      const hash = JSON.stringify(action.payload);
      state.items = state.items.filter(val => val.hash !== hash); 
    },
    closeAll: (state) => {
      state.items = [];
    } 
  }
});

export default tooltipsSlice;
