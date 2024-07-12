import { MenuDataItem } from '@ant-design/pro-components'
import { RouterTypes } from '@umijs/max'
import { AnyAction } from 'redux'
import { defaultSettings as SettingModelState } from '../../config/defaultSettings'
import { GlobalModelState } from './global'
import { UserModelState } from './user'

export { GlobalModelState, SettingModelState, UserModelState }

export interface Loading {
  global: boolean
  effects: { [key: string]: boolean | undefined }
  models: {
    global?: boolean
    menu?: boolean
    setting?: boolean
    user?: boolean
    login?: boolean
  }
}

export interface ConnectState {
  global: GlobalModelState
  loading: Loading
  settings: SettingModelState
  user: UserModelState
}

export interface Route extends MenuDataItem {
  routes?: Route[]
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>
}
