import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { groupBy } from 'src/utils'
import { initialState } from '.'

import { fetchSections } from 'src/api/sections'
import type { RootState } from 'src/data/store'

export const getSections = createAsyncThunk(
  'sections/fetch',
  async () => {
    return await fetchSections();
  }
)

const shouldGetSections = (state: RootState): boolean => {

  const sections = state.sections;

  if (!sections) return true
  if (sections.status === "loading") return false
  if (sections.items.length > 0) return false;

  return true;
}

export const getSectionsIfNeeded = (): any => (dispatch: any, getState: any) => {
  if (shouldGetSections(getState())) {
    return dispatch(getSections());
  }
}

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSections.pending, (state, action) => {
        state.status = "loading";
        delete state.error;        
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
        state.tree = groupBy(state.items, item => item.forum);
        delete state.error;        
      })
      .addCase(getSections.rejected, (state, action) => {
        state.status = "error";
        state.error  = action.error?.message;
      })      
  }
});

export default sectionsSlice;
