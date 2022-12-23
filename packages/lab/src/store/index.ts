import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import syncSaga from './sagas/sync';
import storage from './storage';

const sagaMiddleware = createSagaMiddleware();

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['auth'],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware);
  },
  enhancers: [],
});

sagaMiddleware.run(syncSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
