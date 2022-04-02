import { createReducer } from '@reduxjs/toolkit'
import { defaultOptionsState, IOptionsState } from '.';
import { readOptions, saveOptions } from './actions'


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