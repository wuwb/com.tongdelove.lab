import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import syncSaga from './sagas/sync';
import storage from './storage';

export const store = configureStore({
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


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
