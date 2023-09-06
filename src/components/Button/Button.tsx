import classNames from 'classnames';
import * as React from 'react';
import { Loader } from '../Loader';
import './Button.styles.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ loading, children, disabled, className, ...rest }) => {
  const classes = classNames(
    'button',
    {
      button_disabled: disabled,
      button_loading: loading,
    },
    className,
  );

  return (
    <button className={classes} disabled={loading || disabled} {...rest}>
      {loading && <Loader size="s" className="color_inherit" />}
      {children}
    </button>
  );
};
