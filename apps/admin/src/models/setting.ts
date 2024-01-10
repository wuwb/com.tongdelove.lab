import { Reducer } from 'redux';
import { defaultSettings } from '../../config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: typeof defaultSettings;
  reducers: {
    changeSetting: Reducer<typeof defaultSettings>;
  };
}

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    // 修改设置
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth } = payload;

      // 修改宽度
      if (state?.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }

      // 更改色弱设置
      updateColorWeak(!!colorWeak);

      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
