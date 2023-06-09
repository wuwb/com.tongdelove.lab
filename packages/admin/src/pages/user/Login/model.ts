import { stringify } from 'querystring';
import { history } from '@umijs/max';
import { login } from '@/services/base/auth';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);

      if (response.code === 200) {
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();

        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        redirect = redirect === 'login' ? '/' : redirect;
        history.replace(redirect || '/');
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      // If it is not the login interface, jump to the login interface
      if (window.location.pathname !== '/login') {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.setItem('token', payload.data.token);
      localStorage.setItem('roles', payload.data.auth);
      console.log(`login, ${payload.data.auth}`);
      return { ...state };
    },
  },
};

export default Model;
