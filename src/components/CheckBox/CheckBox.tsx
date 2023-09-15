import classNames from 'classnames';
import * as React from 'react';
import { Icon } from '../icons/Icon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, className, disabled, ...rest }) => {
  const [hovered, setHovered] = React.useState(false);
  const classes = classNames(
    styles.checkbox,
    {
      [styles.checkbox_hover]: hovered,
      [styles.checkbox_disabled]: disabled,
    },
    className,
  );

  return (
    <label className={classes} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <input onChange={(e) => onChange(e.target.checked)} type="checkbox" disabled={disabled} {...rest} />
      {rest.checked && (
        <Icon width={30} height={23}>
          <svg viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66663 9.35484L11.4625 20L28.3333 1.66667" stroke="currentColor" strokeWidth="3.33333" />
          </svg>
        </Icon>
      )}
    </label>
  );
};
