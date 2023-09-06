import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...rest
}) => {
  const container = React.useRef<null | SVGSVGElement>(null);

  return (
    <svg
      width={width}
      height={height}
      ref={container}
      className={`
        ${className ? className : ''} 
        ${color ? `color_${color}` : ''}`}
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Icon;
