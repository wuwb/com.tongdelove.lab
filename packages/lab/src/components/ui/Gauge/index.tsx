import { FC, ReactNode } from 'react';
import { styled } from '@mui/system';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

interface GaugeProps {
  className?: string;
  color?:
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'white'
  | 'trueWhite';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  circleRatio?: number;
  styles?: any;
  value?: number;
  text: any;
  strokeWidth?: number;
  children?: ReactNode;
}

const Gauge: FC<GaugeProps> = ({
  className,
  color = 'primary',
  size = 'medium',
  circleRatio,
  value,
  styles,
  text,
  strokeWidth,
  children,
  ...rest
}) => {
  return (
    <CircularProgressbarWithChildren
      circleRatio={circleRatio}
      value={value}
      text={text}
      strokeWidth={strokeWidth}
      styles={styles}
      className={`MuiGauge-${color} MuiGauge-${size}`}
      {...rest}
    >
      {children}
    </CircularProgressbarWithChildren>
  );
};

export default Gauge;
