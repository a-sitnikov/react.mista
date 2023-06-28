import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { INewMessageRequest, fetchNewMessage } from 'src/api';

export type NewMessageState = {
  status: "init" | "loading" | "success" | "error",
  text: string,
  error?: string
};

const initialState: NewMessageState = {
  status: "init",
  text: ''
}

export type PostNewmessageParams = {
  text: string,
  topicId: string,
  voting_select?: number,
  onSuccess?: () => void
}

export const postNewMessage = createAsyncThunk(
  'newMessage/post',
  async (params: PostNewmessageParams) => {
    let fetchParams: INewMessageRequest = {
      message_text: params.text,
      action: "new",
      topic_id: params.topicId,
      rnd: Math.round(Math.random() * 10000000000)
    };

    if (params.voting_select)
      fetchParams.voting_select = params.voting_select;

    await fetchNewMessage(fetchParams);

    // if (params.onSuccess)
    //   params.onSuccess();
  })

const slice = createSlice({
  name: 'newMessage',
  initialState,
  reducers: {
    changeText: (state, { payload }: PayloadAction<string>) => {
      state.text = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewMessage.pending, (state) => {
        state.status = "loading";
        delete state.error;
      })
      .addCase(postNewMessage.fulfilled, (state) => {
        state.text = '';
        delete state.error;
      })
      .addCase(postNewMessage.rejected, (state, { error }) => {
        state.status = "error";
        state.error = error?.message;
      })
  }
});

export const { actions: newMessageActions, reducer: newMessage } = slice;