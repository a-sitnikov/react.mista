//@flow
import { createReducer } from '@reduxjs/toolkit'
import { readOptions, saveOptions } from './actions'

export type Column = {
  name: string,
  className?: string,
  width?: string
}

export type OptionsItems = {
  theme: 'yellow' | 'lightgray' | 'dark',
  topicsPerPage: string,
  autoRefreshTopicsList: string,
  autoRefreshTopicsListInterval: string,
  autoRefreshTopic: string,
  autoRefreshTopicInterval: string,
  contetnMaxWidth?: string,
  tooltipDelay: string,
  showTooltips: string,
  showTooltipOnTopicsList: string
}

export type OptionsState = {
  voteColors: Array<string>,
  items: OptionsItems,
  show?: boolean
};

export const defaultOptionsState: OptionsState = {
  voteColors: [
    "#FF1616", //1
    "#1A861A", //2
    "#0023FF", //3
    "#FF6B18", //4
    "#9B3A6E", //5
    "#567655", //6
    "#233345", //7
    "#CC0000", //8
    "#00CCCC", //9
    "#0000CC", //10
  ],
  items: {
    theme: 'lightgray',
    topicsPerPage: '20',
    autoRefreshTopicsList: 'false',
    autoRefreshTopicsListInterval: '60',
    autoRefreshTopic: 'true',
    autoRefreshTopicInterval: '60',
    //tooltips
    showTooltips: 'true',
    tooltipDelay: '500',
    showTooltipOnTopicsList: 'true',
    showTooltipOnPostLink: 'true',
    //links
    showYoutubeVideoTitle: 'true',
    replaceCatalogMista: 'true',
    fixBrokenLinks: 'true',
  }
}

const readOption = (name, defaultValue) => {
  return window.localStorage.getItem(name) || defaultValue;
}

const readAllOptions = () => {
  
  let state: OptionsState = defaultOptionsState;
  for (let key in state.items) {
    state.items[key] = readOption(key, state.items[key]);
  }

  return state;
}

const reducer = createReducer(readAllOptions(), (builder) => {
  builder
    .addCase(readOptions, (state) => {
      let items = Object.assign({}, defaultOptionsState.items);
      for (let key in items) {
        items[key] = readOption(key, defaultOptionsState.items[key]);
      }
      state.items = items;
    })
    .addCase(saveOptions, (state, action) => {
      for (let key in action.payload.options) {
        const value = String(action.payload.options[key]); 
        window.localStorage.setItem(key, value);
        state.items[key] = value;
      }
    })
  })

export default reducer;