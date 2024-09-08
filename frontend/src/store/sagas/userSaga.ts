// frontend/src/store/sagas/userSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../slices/userSlice"; // Ensure this path is correct
import { IUser } from "../../types"; // Ensure this path is correct

const fetchUsersApi = async (): Promise<IUser[]> => {
  const response = await axios.get("/api/v1/users");
  return response.data;
};

function* fetchUsersSaga() {
  try {
    const users: IUser[] = yield call(fetchUsersApi);
    yield put(fetchUsersSuccess(users));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}
