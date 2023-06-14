import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ITopicInfo, ITopicMessage, initialState } from '.';

import { fetchTopicMessage, fetchTopicMessages } from 'src/api/topicMessages'
import { fetchTopicInfo } from 'src/api/topicinfo'
import { RootState } from '../store';

export const getTopic = createAsyncThunk(
  'topics/fetch',
  async ({ topicId, page, item0 }: { 
      topicId: number, 
      page: number | string, 
      item0: ITopicMessage 
    }, { rejectWithValue }) => {

    let info: ITopicInfo;
    try {
      info = await fetchTopicInfo(topicId);
    } catch (e) {
      console.error(e);
      info = {
        id: topicId,
        title: '',
        count: -1
      };
    }

    try {
      let _item0 = item0;
      let _items;
      if (page === 'last20') {

        if (info.count > 21) {

          if (!_item0) {
            _item0 = await fetchTopicMessage(topicId, 0);
          }

          let first = info.count - 20;
          _items = await fetchTopicMessages({
            id: topicId,
            from: first,
            to: 1010
          });

        } else {
          let items = await fetchTopicMessages({
            id: topicId,
            from: 0,
            to: 1010
          });
          _item0 = items[0];
          _items = items.slice(1);
        }

      } else {

        page = +page;
        let first = 0;
        let last = page * 100 - 1;

        if (page > 1) {

          first = (page - 1) * 100;
          if (!_item0) {
            _item0 = await fetchTopicMessage(topicId, 0);
          }

          _items = await fetchTopicMessages({
            id: topicId,
            from: first,
            to: last
          });

        } else {
          if (_item0)
            first = 1;
          else
            first = 0;

          let items = await fetchTopicMessages({
            id: topicId,
            from: first,
            to: last
          });

          if (_item0) {
            _items = items;
          } else {
            _item0 = items[0];
            _items = items.slice(1);
          }
        }

      }

      if (info.count === 0 && _items.length > 0)
        info.count = _items[_items.length - 1].n;

      if (page === 'last20' && _items.length > 20) {
        _items = _items.slice(-20);
      }

      return {
        info,
        item0: _item0,
        list: _items
      }

    } catch (error) {

      console.error('Failed to fetch topic:', error);
      rejectWithValue(error);

    }
  }
)

export const getNewMessages = createAsyncThunk(
  'topic/getNewMessages',
  async ({ id, count }:  {
      id: number, 
      count: number
    }) => {

    return await fetchTopicMessages({
      id: id,
      from: count + 1,
      to: 1050
    });

  }
)

const shouldFetch = ({ topic } : RootState) => {
  
  if (!topic) return true;
  if (topic.status === "loading") return false;
  
  return true
}

export const getTopicIfNeeded = (topicId: number, page: number |string): any => (dispatch: any, getState: any) => {
 
  const state = getState();
  if (shouldFetch(state)) {
    let item0: ITopicMessage = null;
    if (topicId === state.topic.info.id)
      item0 = state.topic.item0;  
    return dispatch(getTopic({ topicId, page, item0 }));
  }
}

export const getNewMessagesIfNeeded = () => (dispatch: any, getState: any) => {
  const state = getState();
  const { id, count } = state.topic.info;
  if (shouldFetch(state)) {
    return dispatch(getNewMessages({ id, count }));
  }
}

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.status = "init";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopic.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(getTopic.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.items = payload.list;
        state.item0 = payload.item0;
        state.info = payload.info;

        delete state.error;
      })
      .addCase(getTopic.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error?.message;
      })
      // getNewMessages
      .addCase(getNewMessages.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(getNewMessages.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload.length > 0) {
          state.items = state.items.concat(payload);
          state.info.count = state.items[state.items.length - 1].n;
        }

        delete state.error;
      })
      .addCase(getNewMessages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error?.message;
      })
  }
})

export default topicSlice;
