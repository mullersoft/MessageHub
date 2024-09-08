import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMessagesRequest, fetchMessagesSuccess, fetchMessagesFailure, fetchMessageByIdRequest, fetchMessageByIdSuccess, fetchMessageByIdFailure } from '../slices/messageSlice';
import { IMessage } from '../../types';

const fetchMessagesApi = async (categoryId: string): Promise<IMessage[]> => {
  const response = await fetch(`/api/v1/messages/categories/${categoryId}/messages`);
  if (!response.ok) throw new Error('Failed to fetch messages');
  const data = await response.json();
  return data.data.messages; // Ensure you are returning the correct part of the response
};


const fetchMessageByIdApi = async (id: string): Promise<IMessage> => {
  const response = await fetch(`/api/v1/messages/${id}`);
  if (!response.ok) throw new Error('Failed to fetch message');
  
  const data = await response.json();
  return data.data.message;  // Access message from the nested `data` object
};


function* fetchMessagesSaga(action: ReturnType<typeof fetchMessagesRequest>) {
  try {
    const messages: IMessage[] = yield call(fetchMessagesApi, action.payload);
    yield put(fetchMessagesSuccess(messages));
  } catch (error: any) {
    yield put(fetchMessagesFailure(error.message));
  }
}

function* fetchMessageByIdSaga(action: ReturnType<typeof fetchMessageByIdRequest>) {
  try {
    const message: IMessage = yield call(fetchMessageByIdApi, action.payload);
    yield put(fetchMessageByIdSuccess(message));
  } catch (error: any) {
    yield put(fetchMessageByIdFailure(error.message));
  }
}

export function* watchFetchMessages() {
  yield takeLatest(fetchMessagesRequest.type, fetchMessagesSaga);
}

export function* watchFetchMessageById() {
  yield takeLatest(fetchMessageByIdRequest.type, fetchMessageByIdSaga);
}
