import { Outlet } from '@umijs/max'
import Styles from './index.less'

const Box = (props) => {
  return (
    <div className={Styles.boxWrap}>
      <Outlet />
    </div>
  )
}

export default Box
