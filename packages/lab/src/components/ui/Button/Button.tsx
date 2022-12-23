import * as React from 'react';
import cx from 'clsx';
import { Loader } from '../Loader';
import { Spinner } from '../Spinner';
import styles from './styles.module.scss';

// eslint-disable-next-line react/display-name
export const SpinnerButton = React.forwardRef(({ }, ref) => {
  return (
    <button ref={() => ref}>
      <Spinner />
    </button>
  );
});

SpinnerButton.displayName = 'SpinnerButton';

export const DangerButton = props => {
  const { type, onClick, children } = props;
  return (
    <button className={styles['btn-danger']} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export const AppearanceButton = props => {
  const { button, className, appearance, compact = false, handleClick, loading = false, type, children } = props;

  return (
    <button onClick={handleClick} type={type}>
      <div
        className={cx(
          className,
          // Common classes
          'flex w-full justify-center rounded-md border-2 text-center text-base font-semibold uppercase tracking-wide md:text-sm lg:w-auto',
          // Full-size button
          {
            'px-8 py-4': compact === false,
          },
          // Compact button
          {
            'px-6 py-2': compact === true,
          },
          // Specific to when the button is fully dark
          {
            'border-primary-600 bg-primary-600 text-white': appearance === 'dark',
          },
          // Specific to when the button is dark outlines
          {
            'border-primary-600 text-primary-600': appearance === 'dark-outline',
          },
          // Specific to when the button is fully white
          {
            'border-white bg-white text-primary-600': appearance === 'white',
          },
          // Specific to when the button is white outlines
          {
            'border-white text-white': appearance === 'white-outline',
          }
        )}
      >
        {loading && <Loader />}
        {button.text || children}
      </div>
    </button>
  );
};

type IButtonProps = {
  xl?: boolean;
  children: string;
};

export function Button2(props: IButtonProps) {
  const btnClass = cx({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
  });

  return <div className={btnClass}>{props.children}</div>;
}

export const Button = (props: any) => {
  return <div className={cx('btn btn-primary', props.className)}>{props.children}</div>;
};
