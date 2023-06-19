import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { ISectionItem } from "./sections";
import { fetchNewTopic, IRequest } from 'src/api/newtopic';
import type { RootState } from './store'

export type NewTopicState = {
  status: "init" | "loading" | "success" | "error",
  section: ISectionItem,
  text: string,
  subject: string,
  forum: string,
  isVoting: boolean,
  error?: string
};

export const initialState: NewTopicState = {
  status: "init",
  section: null,
  text: '',
  subject: '',
  forum: '1C',
  isVoting: false
}

export type postNewTopicParams = {
  subject: string,
  text: string,
  section: number,
  forum: string,
  isVoting: boolean,
  votingItems?: Array<string>,
  onSuccess?: () => void
};

export const postNewTopic = createAsyncThunk(
  'newTopic/post',
  async (params: postNewTopicParams) => {

    let fetchParams: IRequest = {
      message_text: params.text,
      topic_text: params.subject,
      target_section: String(params.section),
      target_forum: params.forum.toLowerCase(),
      action: 'new',
      rnd: Math.round(Math.random() * 10000000000),
      voting: params.isVoting ? 1 : 0
    };

    if (params.votingItems)
      for (let i = 0; i < params.votingItems.length; i++) {
        fetchParams[`section${i + 1}`] = params.votingItems[i];
      }

    await fetchNewTopic(fetchParams);

  })

  export const shouldPostNewTopic = ({ newTopic }: RootState): boolean => {
    
    if (!newTopic) return false
    if (newTopic.status === "loading") return false
    
    return true
  }
  

const clear = (state: NewTopicState) => {
  state.status = "init";
  state.text = '';
  state.subject = '';
  state.forum = '';
  state.isVoting = false;
}

const slice = createSlice({
  name: 'newTopic',
  initialState,
  reducers: {
    clear,
    changeSubject: (state, { payload }: PayloadAction<string>) => {
      state.subject = payload;
    },
    changeSection: (state, { payload }: PayloadAction<ISectionItem>) => {
      state.section = payload;
      state.forum = payload?.forum.toLowerCase();
    },
    showVoting: (state, { payload }: PayloadAction<boolean>) => {
      state.isVoting = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewTopic.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(postNewTopic.fulfilled, (state) => {
        clear(state);
        delete state.error;
      })
      .addCase(postNewTopic.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
      })
  }
});

// const reducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(postNewTopicStart, (state) => {
//       state.isFetching = true;
//       delete state.error;
//     })
//     .addCase(postNewTopicComplete, (state) => {
//       state.isFetching = false;
//     })
//     .addCase(postNewTopicError, (state, action) => {
//       state.isFetching = false;
//       state.error = action.payload;
//     })
//     .addCase(newTopicText, (state, action) => {
//       state.text = action.payload.text;
//     })
//     .addCase(newTopicClear, (state) => {
//       state.text = '';
//       state.subject = '';
//       state.isVoting = false;
//     })
//     .addCase(newTopicSubject, (state, action) => {
//       state.subject = action.payload.text;
//     })
//     .addCase(newTopicShowVoting, (state, action) => {
//       state.isVoting = action.payload.show;
//     })
//     .addCase(newTopicSection, (state, action) => {
//       state.section = action.payload.section;
//       state.forum = action.payload.section == null ? '' : action.payload.section.forum.toLowerCase()
//     })
// })

export const { actions: newTopicActions, reducer: newTopic } = slice;