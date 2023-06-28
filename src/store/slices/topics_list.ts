import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { ITopicsListRequest, fetchTopicsList } from 'src/api'
import { domain, urlTopicsList } from 'src/api';
import { RootState } from '../types';

export interface ITopicsListItem {
  id: number,
  author: string,
  lastUser: string,
  forum: string,
  sectionCode: string,
  section: string,
  count: number,
  text: string,
  created: number,
  updated: number,
  closed: boolean,
  down: boolean,
  pinned: boolean
  isVoting: boolean,
  showPreview: boolean,
  previewMsgNumber?: number
}

export interface ITopicsList extends Array<ITopicsListItem> { }

export interface TopicsListState {
  status: "init" | "loading" | "success" | "error",
  items: ITopicsList,
  error?: string,
  lastUpdated?: number
}

const initialState: TopicsListState = {
  status: "init",
  items: []
}

export const getTopicsList = createAsyncThunk(
  'topicsList/fetch',
  async (params: ITopicsListRequest, { getState }) => {

    const state = getState() as RootState;

    let itemsPerPage = +state.options.items.topicsPerPage;
    if (itemsPerPage > 99) itemsPerPage = 99;
    params.itemsPerPage = itemsPerPage;

    const json = await fetchTopicsList(params);
    return json.slice(-itemsPerPage);

  }
)

const shouldFetch = ({ topicsList }: RootState) => {
  
  if (!topicsList) return true
  if (topicsList.status === "loading") return false
  
  return true
}

export const getTopicsListIfNeeded = (params: ITopicsListRequest): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(getTopicsList(params));
  }
}

const slice = createSlice({
  name: 'topicsList',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.status = "init"; 
    },
    togglePreview: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload.topicId); 
      item.showPreview = !item.showPreview; 
      item.previewMsgNumber = payload.msgNumber;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopicsList.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(getTopicsList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.items = payload;

        delete state.error;
      })
      .addCase(getTopicsList.rejected, (state, { error }) => {
        state.status = "error";
        state.error = `${error?.message} ${domain}/${urlTopicsList}`;
      })
  }
})

export const { actions: topicsListActions, reducer: topicsList } = slice;
