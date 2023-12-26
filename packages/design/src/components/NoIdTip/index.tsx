import styles from './index.module.css';
import clsx from 'clsx';

interface Props {
  loginHandler: any;
  className: string;
}

const NoIdTip = (props: Props) => {
  const { loginHandler } = props;

  return (
    <div className={clsx(styles.noIdTipWrap, props.className)}>
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <span>登录后</span>请选择一个模板开始设计
        </div>
        <div onClick={loginHandler}>登录</div>
      </div>
    </div>
  );
}

export default NoIdTip;
