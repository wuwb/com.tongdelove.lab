import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryUser } from '@/services/base/admin/user';
import { currentUser } from '@/services/base/auth/index';

export interface CurrentUser {
  avatar?: string;
  username?: string;
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUser);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    // 获取当前用户
    *fetchCurrent(_, { call, put }) {
      const response = yield call(currentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response && response.data ? response.data : {},
      });
    },
  },

  reducers: {
    // 保存当前用户
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
