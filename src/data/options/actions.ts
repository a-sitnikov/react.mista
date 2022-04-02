import { createAction } from '@reduxjs/toolkit'

export const readOptions = createAction('READ_OPTIONS');
export const saveOptions = createAction('SAVE_OPTIONS', options => ({
  payload: {
    options,
  }
}));
