import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settings from './settings'
import migrate from './migrate'

const rootReducer = combineReducers({
  settings,
})

const store = configureStore({
  // @ts-ignore store type is unknown
  reducer: persistedReducer as typeof rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
  devTools: true,
})

const persistedReducer = persistReducer(
  {
    key: 'cherry-studio',
    storage,
    version: 69,
    blacklist: ['runtime'],
    migrate,
  },
  rootReducer
)

export type RootState = ReturnType<typeof rootReducer>

window.store = store

export default store
