import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IOptionsItems {
  theme: 'yellow' | 'lightgray' | 'dark',
  topicsPerPage: string,
  autoRefreshTopicsList: string,
  autoRefreshTopicsListInterval: string,
  autoRefreshTopic: string,
  autoRefreshTopicInterval: string,
  tooltipDelay: string,
  showTooltips: string,
  showTooltipOnPostLink: string,
  showYoutubeVideoTitle: string,
  replaceCatalogMista: string,
  fixBrokenLinks: string
}

export interface OptionsState {
  voteColors: Array<string>,
  items: IOptionsItems,
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
    showTooltipOnPostLink: 'true',
    //links
    showYoutubeVideoTitle: 'true',
    replaceCatalogMista: 'true',
    fixBrokenLinks: 'true',
  }
}

const readOption = (name: string, defaultValue: string): string => {
  return window.localStorage.getItem(name) || defaultValue;
}

const readAllOptions = (): OptionsState => {
  
  let state: OptionsState = defaultOptionsState;
  for (let key in state.items) {
    state.items[key] = readOption(key, state.items[key]);
  }

  return state;
}

const slice = createSlice({
  name: 'options',
  initialState: readAllOptions(),
  reducers: {
    read: (state) => {
      for (let key in defaultOptionsState.items) {
        state.items[key] = readOption(key, defaultOptionsState.items[key]);
      }
    },
    save: (state, { payload }: PayloadAction<IOptionsItems>) => {
      for (let key in payload) {
        const value = String(payload[key]); 
        state.items[key] = value;
        window.localStorage.setItem(key, value);
      }
    }
  }
});

export const { actions: optionsActions, reducer: options } = slice;