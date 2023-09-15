import classNames from 'classnames';
import * as React from 'react';
import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

export const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...rest
}) => {
  const container = React.useRef<null | SVGSVGElement>(null);
  const classes = classNames(className, { [styles[`color_${color}`]]: color });
  return (
    <svg width={width} height={height} ref={container} className={classes} {...rest}>
      {children}
    </svg>
  );
};
