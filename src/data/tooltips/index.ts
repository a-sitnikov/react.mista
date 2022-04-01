export interface ITooltipKeys {
  type: string,
  topicId: number,
  number: number
}

export interface ICoords {
  x: number,
  y: number
}

export interface ITooltipItem {
  hash: string,
  keys: ITooltipKeys,
  coords: ICoords,
  zIndex: number
}

export interface ITooltipsList extends Array<ITooltipItem> {}

export interface ITooltipsState {
  items: ITooltipsList,
}

export const initialState: ITooltipsState = {
  items: []
}