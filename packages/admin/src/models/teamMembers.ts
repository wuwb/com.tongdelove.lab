import dvaModelExtend from 'dva-model-extend';

export interface TeamMembersModelState {
  name: string;
}

const teamMembersModel = {
  namespace: 'teamMembers',
  state: [
    {
      name: '吴文斌',
      title: '创始人兼CEO',
      img: '/',
    },
    {
      name: '王鹏',
      title: '产品副总裁',
      img: '',
    },
    {
      name: '黄章龙',
      title: '供应链管理副总裁',
      img: '',
    },
    {
      name: '苏祥运',
      title: '首席运营官',
      img: '',
    },
    {
      name: '李景雷',
      title: '设计总监',
      img: '',
    },
    {
      name: '吴绍梁',
      title: '行业顾问',
      img: '',
    },
  ],
  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    delete(state, { payload: id }) {
      return state.filter((item) => item.id !== id);
    },
    get(state, { payload: id }) {
      return state;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default teamMembersModel;
