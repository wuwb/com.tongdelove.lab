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
import browser from './browser'
import migrate from './migrate'

const rootReducer = combineReducers({
  settings,
  browser,
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

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
  devTools: true,
})

export type RootState = ReturnType<typeof rootReducer>

window.store = store

export default store
