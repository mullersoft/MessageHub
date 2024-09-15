import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../slices/messageSlice";
import { IMessage } from "../../types";
const apiUrl = process.env.REACT_APP_API_URL;

// API calls
export const fetchMessagesApi = async (categoryId: string | undefined): Promise<IMessage[]> => {
  const response = await fetch(
    `${apiUrl}/api/v1/messages/categories/${categoryId}/messages`
  );
  if (!response.ok) throw new Error("Failed to fetch messages");
  const data = await response.json();
  return data.data.messages;
};

const fetchMessagesForAdminApi = async (): Promise<IMessage[]> => {
  const response = await axios.get(`${apiUrl}/api/v1/messages`);
  if (response.status !== 200) throw new Error("Failed to fetch messages");
  return response.data.data; // Ensure this is an array
};

const postMessageApi = async (messageData: { text: string; category: string }): Promise<IMessage> => {
  const response = await axios.post(`${apiUrl}/api/v1/messages`, messageData);
  if (response.status !== 201) throw new Error('Failed to post message');
  return response.data.data;
};

const deleteMessageApi = async (messageId: string): Promise<void> => {
  await axios.delete(`${apiUrl}/api/v1/messages/${messageId}`);
};
const updateMessageApi = async (messageId: string, messageData: { text: string; category: string }): Promise<IMessage> => {
  const response = await axios.patch(`${apiUrl}/api/v1/messages/${messageId}`, messageData);
  if (response.status !== 200) throw new Error('Failed to update message');
  return response.data.data;
};


// Sagas
function* fetchMessagesSaga(action: ReturnType<typeof fetchMessagesRequest>) {
  try {
    const messages: IMessage[] = yield call(fetchMessagesApi, action.payload);
    yield put(fetchMessagesSuccess(messages));
  } catch (error: any) {
    yield put(fetchMessagesFailure(error.message));
  }
}

function* fetchMessagesForAdminSaga() {
  try {
    const messages: IMessage[] = yield call(fetchMessagesForAdminApi);
    yield put(fetchMessagesForAdminSuccess(messages));
  } catch (error: any) {
    yield put(fetchMessagesForAdminFailure(error.message));
  }
}

function* postMessageSaga(action: ReturnType<typeof postMessageRequest>) {
  try {
    const message: IMessage = yield call(postMessageApi, action.payload);
    yield put(postMessageSuccess(message));
  } catch (error: any) {
    yield put(postMessageFailure(error.message));
  }
}


function* deleteMessageSaga(action: ReturnType<typeof deleteMessageRequest>) {
  try {
    yield call(deleteMessageApi, action.payload);
    yield put(deleteMessageSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteMessageFailure(error.message));
  }
}

function* updateMessageSaga(action: ReturnType<typeof updateMessageRequest>) {
  try {
    const message: IMessage = yield call(updateMessageApi, action.payload.id, {
      text: action.payload.text,
      category: action.payload.category,
    });
    yield put(updateMessageSuccess(message));
  } catch (error: any) {
    yield put(updateMessageFailure(error.message));
  }
}



// Watchers
export function* watchFetchMessages() {
  yield takeLatest(fetchMessagesRequest.type, fetchMessagesSaga);
}

export function* watchFetchMessagesForAdmin() {
  yield takeLatest(
    fetchMessagesForAdminRequest.type,
    fetchMessagesForAdminSaga
  );
}

export function* watchPostMessage() {
  yield takeLatest(postMessageRequest.type, postMessageSaga);
}

export function* watchDeleteMessage() {
  yield takeLatest(deleteMessageRequest.type, deleteMessageSaga);
}

export function* watchUpdateMessage() {
  yield takeLatest(updateMessageRequest.type, updateMessageSaga);
}
