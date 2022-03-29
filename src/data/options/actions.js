import { createAction } from '@reduxjs/toolkit'
import type { OptionsItems } from 'src/data/options/reducer'

export const readOptions = createAction('READ_OPTIONS');
export const saveOptions = createAction('SAVE_OPTIONS', options => ({
  payload: {
    options,
  }
}));
