import React from 'react';
import './Input.styles.scss';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...rest }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const classes = classNames(
      'input-wrapper',
      { 'input-wrapper_focused': focused },
      className
    );

    return (
      <div
        className={classes}
        onClick={(e) => {
          const input = e.currentTarget.firstElementChild as HTMLInputElement;
          input.focus();
        }}
      >
        <input
          ref={ref}
          className="input"
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {afterSlot && <div className="input-icon">{afterSlot}</div>}
      </div>
    );
  }
);

export default Input;
