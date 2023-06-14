import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultOptionsState, IOptionsState, IOptionsItems } from '.';


const readOption = (name: string, defaultValue: string): string => {
  return window.localStorage.getItem(name) || defaultValue;
}

const readAllOptions = (): IOptionsState => {
  
  let state: IOptionsState = defaultOptionsState;
  for (let key in state.items) {
    state.items[key] = readOption(key, state.items[key]);
  }

  return state;
}

const optionsSlice = createSlice({
  name: 'options',
  initialState: readAllOptions(),
  reducers: {
    read: (state) => {
      let items = Object.assign({}, defaultOptionsState.items);
      for (let key in items) {
        items[key] = readOption(key, defaultOptionsState.items[key]);
      }
      state.items = items;
    },
    save: (state, action: PayloadAction<IOptionsItems>) => {
      for (let key in action.payload) {
        const value = String(action.payload[key]); 
        window.localStorage.setItem(key, value);
        state.items[key] = value;
      }
    }
  }
});

export default optionsSlice;