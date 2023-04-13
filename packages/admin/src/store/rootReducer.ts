import { combineReducers } from '@reduxjs/toolkit'

import userInfo from './reducers/userInfo';
import topicList from './reducers/topicList';
import personalInfo from './reducers/personalInfo';
import searchInfo from './reducers/searchInfo';

export default combineReducers({
  userInfo,
  topicList,
  personalInfo,
  searchInfo,
});
