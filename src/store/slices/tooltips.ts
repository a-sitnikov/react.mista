import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ITooltipKeys {
  topicId: number;
  number: number;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface ITooltipItem {
  hash: string;
  keys: ITooltipKeys;
  coords: ICoords;
  zIndex: number;
}

export interface ITooltipsList extends Array<ITooltipItem> {}

export interface TooltipsState {
  items: ITooltipsList;
}

const initialState: TooltipsState = {
  items: [],
};

const show = (
  state: TooltipsState,
  { payload }: PayloadAction<{ keys: ITooltipKeys; coords: ICoords }>
) => {
  const hash = JSON.stringify(payload.keys);
  const index = state.items.findIndex((item) => item.hash === hash);
  let zIndex = 0;
  if (state.items.length)
    zIndex = state.items[state.items.length - 1].zIndex + 1;
  if (index === -1)
    state.items.push({
      keys: payload.keys,
      coords: payload.coords,
      hash,
      zIndex,
    });
  else {
    //state.list = moveToEnd(state.list, index);
    state.items[state.items.length - 1].zIndex = zIndex;
  }
};

const slice = createSlice({
  name: "tooltips",
  initialState,
  reducers: {
    show,
    close: (state, { payload }: PayloadAction<ITooltipKeys>) => {
      const hash = JSON.stringify(payload);
      state.items = state.items.filter((val) => val.hash !== hash);
    },
    closeAll: (state) => {
      state.items = [];
    },
  },
});

export const { actions: tooltipsActions, reducer: tooltips } = slice;
