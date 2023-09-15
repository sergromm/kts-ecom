import classNames from 'classnames';
import * as React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const classes = classNames(styles.wrapper, { [styles.wrapper_focused]: focused }, className);

    return (
      <div
        className={classes}
        onClick={(e) => {
          const input = e.currentTarget.firstElementChild as HTMLInputElement;
          input.focus();
        }}
      >
        <input
          className={styles.input}
          ref={ref}
          type="text"
          value={value}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          {...rest}
        />
        {afterSlot && <div className={styles.icon}>{afterSlot}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';
