import { combineReducers } from '@reduxjs/toolkit'

import personalInfo from './reducers/personalInfo'
import searchInfo from './reducers/searchInfo'
import topicList from './reducers/topicList'
import userInfo from './reducers/userInfo'

export default combineReducers({
  userInfo,
  topicList,
  personalInfo,
  searchInfo,
})
