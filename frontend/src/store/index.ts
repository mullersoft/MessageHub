import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import categoryReducer from './slices/categorySlice';
import messageReducer from './slices/messageSlice';
import userReducer from './slices/userSlice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    messages: messageReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
