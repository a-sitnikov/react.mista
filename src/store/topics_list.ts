import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import * as API from 'src/api/topicslist'
import { domain, urlTopicsList } from 'src/api/index';
import { RootState } from './store';

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

export interface ITopicsListState {
  status: "init" | "loading" | "success" | "error",
  items: ITopicsList,
  error?: string,
  lastUpdated?: number
}

export const initialState: ITopicsListState = {
  status: "init",
  items: []
}

export const getTopicsList = createAsyncThunk(
  'topicsList/fetch',
  async (params: API.IRequest, { getState }) => {

    const state = getState() as RootState;

    let itemsPerPage = +state.options.items.topicsPerPage;
    if (itemsPerPage > 99) itemsPerPage = 99;
    params.itemsPerPage = itemsPerPage;

    const json = await API.fetchTopicsList(params);
    return json.slice(-itemsPerPage);

  }
)

const shouldFetch = ({ topicsList }: RootState) => {
  
  if (!topicsList) return true
  if (topicsList.status === "loading") return false
  
  return true
}

export const getTopicsListIfNeeded = (params: API.IRequest): any => (dispatch: any, getState: any) => {
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
