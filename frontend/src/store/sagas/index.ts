import { all } from "redux-saga/effects";
import {
  watchFetchCategories,
  watchFetchCategoryById,
  watchCreateCategory,
  watchUpdateCategory,
  watchDeleteCategory,
} from "./categorySaga";
import {
  watchFetchMessages,
  watchFetchMessagesForAdmin,
  watchDeleteMessage,
  watchUpdateMessage,
  watchPostMessage,
} from "./messageSaga"; // Import other sagas if needed

export default function* rootSaga() {
  yield all([
    watchFetchCategories(),
    watchFetchCategoryById(),
    watchCreateCategory(),
    watchUpdateCategory(),
    watchDeleteCategory(),
    watchFetchMessages(),
    watchFetchMessagesForAdmin(),
    watchDeleteMessage(),
    watchUpdateMessage(),
    watchPostMessage(), // Add other watchers as needed
  ]);
}
