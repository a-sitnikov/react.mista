import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { groupBy } from "src/utils";

import { fetchSections } from "src/api";
import { RootState } from "../types";

export interface ISectionItem {
  id: number;
  forum: string;
  code: string;
  name: string;
}

export interface ISectionsTree {
  [key: string]: ISectionItem[];
}

export interface SectionsState {
  status: "init" | "loading" | "success" | "error";
  items: ISectionItem[];
  tree?: ISectionsTree;
  error?: string;
  lastUpdated?: number;
}

const initialState: SectionsState = {
  status: "init",
  items: [],
  tree: {},
};

export const getSections = createAsyncThunk("sections/fetch", async () => {
  return await fetchSections();
});

const shouldGetSections = ({ sections }: RootState): boolean => {
  if (!sections) return true;
  if (sections.status === "loading") return false;
  if (sections.items.length > 0) return false;

  return true;
};

export const getSectionsIfNeeded =
  (): any => (dispatch: any, getState: any) => {
    if (shouldGetSections(getState())) {
      return dispatch(getSections());
    }
  };

const slice = createSlice({
  name: "sections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSections.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(getSections.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.items = payload;
        state.tree = groupBy(state.items, (item) => item.forum);
        delete state.error;
      })
      .addCase(getSections.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
      });
  },
});

export const { actions: sectionsActions, reducer: sections } = slice;
