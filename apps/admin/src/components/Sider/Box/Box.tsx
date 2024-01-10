import { Outlet } from '@umijs/max';
import BoxCell from './BoxCell';
import BoxInner from './BoxInner';
import BoxWrap from './BoxWrap';
import Styles from './index.less';

const Box = (props) => {
  return (
    <BoxWrap>
      {props.title ? <BoxCell>{props.title}</BoxCell> : null}
      <BoxInner className={Styles.boxInner}>
        <Outlet />
      </BoxInner>
    </BoxWrap>
  );
};

export default Box;
