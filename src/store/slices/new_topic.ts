import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { fetchNewTopic, type INewTopicRequest } from "src/api";
import { type RootState } from "../types";

export interface ISectionItem {
  id: number;
  forum: string;
  code: string;
  name: string;
}

export type NewTopicState = {
  status: "init" | "loading" | "success" | "error";
  section: ISectionItem;
  text: string;
  subject: string;
  forum: string;
  isVoting: boolean;
  error?: string;
};

const initialState: NewTopicState = {
  status: "init",
  section: null,
  text: "",
  subject: "",
  forum: "1C",
  isVoting: false,
};

export type postNewTopicParams = {
  subject: string;
  text: string;
  section: number;
  forum: string;
  isVoting: boolean;
  votingItems?: Array<string>;
  onSuccess?: () => void;
};

export const postNewTopic = createAsyncThunk(
  "newTopic/post",
  async (params: postNewTopicParams) => {
    let fetchParams: INewTopicRequest = {
      message_text: params.text,
      topic_text: params.subject,
      target_section: String(params.section),
      target_forum: params.forum.toLowerCase(),
      action: "new",
      rnd: Math.round(Math.random() * 10000000000),
      voting: params.isVoting ? 1 : 0,
    };

    if (params.votingItems)
      for (let i = 0; i < params.votingItems.length; i++) {
        fetchParams[`section${i + 1}`] = params.votingItems[i];
      }

    await fetchNewTopic(fetchParams);
    // if (params.onSuccess)
    // params.onSuccess();
  }
);

export const shouldPost = ({ newTopic }: RootState): boolean => {
  if (!newTopic) return false;
  if (newTopic.status === "loading") return false;

  return true;
};

export const postNewTopicIfNeeded =
  (params: postNewTopicParams) => (dispatch: any, getState: any) => {
    const state = getState();
    if (shouldPost(state)) {
      return dispatch(postNewTopic(params));
    }
  };

const clear = (state: NewTopicState) => {
  state.status = "init";
  state.text = "";
  state.subject = "";
  state.forum = "";
  state.isVoting = false;
};

const slice = createSlice({
  name: "newTopic",
  initialState,
  reducers: {
    clear,
    changeSubject: (state, { payload }: PayloadAction<string>) => {
      state.subject = payload;
    },
    changeText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },
    changeSection: (state, { payload }: PayloadAction<ISectionItem>) => {
      state.section = payload;
      state.forum = payload?.forum.toLowerCase();
    },
    showVoting: (state, { payload }: PayloadAction<boolean>) => {
      state.isVoting = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
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
      });
  },
});

export const { actions: newTopicActions, reducer: newTopic } = slice;
