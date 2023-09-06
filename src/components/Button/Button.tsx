import React from 'react';
import Loader from '../Loader';
import './Button.styles.scss';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  disabled,
  className,
  ...rest
}) => {
  const classes = classNames(
    'button',
    {
      button_disabled: disabled,
      button_loading: loading,
    },
    className
  );

  return (
    <button className={classes} disabled={loading || disabled} {...rest}>
      {loading && <Loader size="s" className="color_inherit" />}
      {children}
    </button>
  );
};

export default Button;
