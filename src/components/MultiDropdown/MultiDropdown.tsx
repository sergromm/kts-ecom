import './MultiDropdown.styles.scss';
import classNames from 'classnames';
import * as React from 'react';
import { Input } from '../Input';
import { Text } from '../Text';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

type ListItemProps = {
  option: Option;
  selected: Option | undefined;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ option, onClick, selected }) => {
  const [hovered, setHovered] = React.useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const color = classNames({
    primary: !hovered && !selected,
    accent: !!selected,
    secondary: hovered && !selected,
  }) as 'primary' | 'secondary' | 'accent';
  return (
    <li
      className="dropdown-option"
      key={option.key}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text color={color} view="p-16">
        {option.value}
      </Text>
    </li>
  );
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  getTitle,
  className,
  disabled,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const dropdownRef = React.useRef<null | HTMLUListElement>(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);

  const handleSelect = (option: Option) => {
    const optionIndex = value.findIndex((o) => o.key === option.key);

    if (optionIndex >= 0) {
      const newValue = value.filter((v) => v.value !== option.value);
      onChange([...newValue]);
    } else {
      onChange([...value, option]);
    }
  };

  const handleInput = (string: string) => {
    setInputValue(string);
  };

  React.useEffect(() => {
    if (!dropdownRef.current || !inputRef.current) {
      return;
    }

    const dropdown = dropdownRef.current;
    const input = inputRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdown.contains(e.target as Node) && input !== e.target) {
        setOpen(false);
        setInputValue('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  const matchInput = (option: Option) => {
    if (!value.find((v) => v.key === option.key)) {
      return option.value.toLowerCase().startsWith(inputValue.toLowerCase());
    }
    return option;
  };

  const getValue = (value: Option[]): string => {
    if (open) {
      return inputValue;
    } else if (value.length === 0) {
      return '';
    }
    return getTitle(value);
  };

  const classes = classNames('multi-dropdown', className);

  return (
    <div className={classes} {...rest}>
      <Input
        afterSlot={<ArrowDownIcon color="secondary" />}
        disabled={disabled}
        placeholder={getTitle(value)}
        ref={inputRef}
        value={getValue(value)}
        onChange={handleInput}
        onClick={() => setOpen(true)}
      />
      {open && !disabled && (
        <ul className="dropdown" ref={dropdownRef}>
          {options.filter(matchInput).map((option) => (
            <ListItem
              key={option.key}
              option={option}
              selected={value.find((v) => v.key === option.key)}
              onClick={() => handleSelect(option)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
