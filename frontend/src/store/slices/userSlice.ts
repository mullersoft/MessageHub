// frontend/src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types'; // Ensure this path is correct

interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer; // Ensure this is a default export
