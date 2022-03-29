//@flow
import { createReducer } from '@reduxjs/toolkit'
import { createTooltip, closeTooltip, clearTooltips } from './actions'

export type TooltipItemState = {
  i: number,
  hash: string
} & TooltipItem

export type TooltipsState = {
  items: Array<TooltipItemState>
};

export const defaultTooltipsState: TooltipsState = {
  items: []
}

const reducer = createReducer(defaultTooltipsState, (builder) => {
  builder
    .addCase(createTooltip, (state, action) => {
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
        state.list[state.list.length - 1].zIndex = zIndex;
      }  
    })
    .addCase(closeTooltip, (state, action) => {
      let hash = JSON.stringify(action.payload.keys);
      state.items = state.items.filter(val => val.hash !== hash);
    })
    .addCase(clearTooltips, (state) => {
      state.items = [];
    })    
})

export default reducer;
