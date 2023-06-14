import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { initialState } from '.'

import * as API from 'src/api/topicslist'
import { domain, urlTopicsList } from 'src/api/index';
import { RootState } from '../store';

export const getTopicsList = createAsyncThunk(
  'topicsList/fetch',
  async (params: API.IRequest, { getState, rejectWithValue }) => {

    const state = getState() as RootState;

    let itemsPerPage = +state.options.items.topicsPerPage;
    if (itemsPerPage > 99) itemsPerPage = 99;
    params.itemsPerPage = itemsPerPage;

    try {
      const json = await API.fetchTopicsList(params);
      return json.slice(-itemsPerPage);

    } catch (e) {

      console.error(e.message);

      const err = new Error(`${e.message} ${domain}/${urlTopicsList}`)
      return rejectWithValue(err);

    }
  }
)

const shouldFetch = (state: RootState) => {
  
  const topicsList = state.topicsList;
  if (!topicsList) return true
  if (topicsList.status === "loading") return false
  
  return true
}

export const getTopicsListIfNeeded = (params: any): any => (dispatch: any, getState: any) => {
  if (shouldFetch(getState())) {
    return dispatch(getTopicsList(params));
  }
}

const topicsListSlice = createSlice({
  name: 'topicsList',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.status = "init"; 
    },
    togglePreview: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.topicId); 
      item.showPreview = !item.showPreview; 
      item.previewMsgNumber = action.payload.msgNumber;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopicsList.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(getTopicsList.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;

        delete state.error;
      })
      .addCase(getTopicsList.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error?.message;
      })
  }
})

export default topicsListSlice;
