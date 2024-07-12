import {
  configureStore,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer'

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      //  Ignore 401 Authorization errors, user doesn't need to see them in message
    } else if (action.payload.status === 404) {
      message.error('Error 404, related API endpoint is not found')
    } else if (action.payload.data && action.payload.data.message) {
      message.error(action.payload.data.message)
    } else {
      message.error(
        'Unknown error occured in the API. Please try again or reach administrator.',
      )
    }
  }

  return next(action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger, rtkQueryErrorLogger),
})

export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
