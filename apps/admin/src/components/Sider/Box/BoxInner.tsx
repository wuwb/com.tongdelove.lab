import { Outlet } from '@umijs/max'
import Styles from './index.less'

const BoxInner = (props) => {
  return (
    <div className={Styles.boxInner}>
      <Outlet />
    </div>
  )
}

export default BoxInner
