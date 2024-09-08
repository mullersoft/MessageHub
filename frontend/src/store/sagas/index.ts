import { all } from 'redux-saga/effects';
import { watchFetchCategories } from './categorySaga';
import { watchFetchMessages, watchFetchMessageById } from './messageSaga'; // Ensure these are named exports
import { watchFetchUsers } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchFetchCategories(),
    watchFetchMessages(),
    watchFetchMessageById(),
    watchFetchUsers(),
  ]);
}
