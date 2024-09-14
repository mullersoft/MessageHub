import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types";

interface MessageState {
  messages: IMessage[];
  adminMessages: IMessage[]; // Always an array
  message: IMessage | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  adminMessages: [], // Initial state as an empty array
  message: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    fetchMessagesRequest(state, action: PayloadAction<string | undefined>) {
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
    postMessageRequest(
      state,
      action: PayloadAction<{ text: string; category: string }>
    ) {
      state.loading = true;
    },
    postMessageSuccess(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    postMessageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateMessageSuccess(state, action: PayloadAction<IMessage>) {
      state.messages = state.messages.map((message) =>
        message._id === action.payload._id ? action.payload : message
      );
      state.adminMessages = state.adminMessages.map((message) =>
        message._id === action.payload._id ? action.payload : message
      );
      state.loading = false;
      state.error = null;
    },
    updateMessageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMessageRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    deleteMessageSuccess(state, action: PayloadAction<string>) {
      if (state.adminMessages.length > 0) {
        state.adminMessages = state.adminMessages.filter(
          (message) => message._id !== action.payload
        );
      }
      state.messages = state.messages.filter(
        (message) => message._id !== action.payload
      );
      state.loading = false;
    },
    deleteMessageFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMessagesForAdminRequest(
      state,
      action: PayloadAction<string | undefined>
    ) {
      state.loading = true;
    },
    fetchMessagesForAdminSuccess(state, action: PayloadAction<IMessage[]>) {
      state.adminMessages = action.payload; // Ensure payload is an array
      state.loading = false;
    },
    fetchMessagesForAdminFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateMessageRequest(
      state,
      action: PayloadAction<{ id: string; text: string; category: string }>
    ) {
      state.loading = true;
    },
  },
});

export const {
  fetchMessagesRequest,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  postMessageRequest,
  postMessageSuccess,
  postMessageFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
  fetchMessagesForAdminRequest,
  fetchMessagesForAdminSuccess,
  fetchMessagesForAdminFailure,
  updateMessageRequest,
  updateMessageSuccess,
  updateMessageFailure,
} = messageSlice.actions;

export default messageSlice.reducer;