import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types';

interface MessageState {
  messages: IMessage[];
  message: IMessage | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  message: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchMessagesSuccess(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMessagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMessageByIdRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchMessageByIdSuccess(state, action: PayloadAction<IMessage>) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMessageByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMessagesRequest, fetchMessagesSuccess, fetchMessagesFailure, fetchMessageByIdRequest, fetchMessageByIdSuccess, fetchMessageByIdFailure } = messageSlice.actions;
export default messageSlice.reducer;
