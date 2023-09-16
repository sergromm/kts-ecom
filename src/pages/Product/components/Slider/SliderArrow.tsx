import classNames from 'classnames';
import * as React from 'react';
import styles from './Slider.module.scss';

type SliderArrowProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'left' | 'right';
  onClick: () => void;
  icon: React.ReactElement;
};
// NOTE: Оставил компонент на одном уровне с родительским, потому что
// не нашёл способ использовать css класс потомка в модуле родителя.
//
// v------ указывает на родителя
// &:hover .arrow {
//         ^^^^^^ arrow находится в другом модуле, поэтому стили не срабатывают
//    /* ... */
// }
export const SliderArrow: React.FC<SliderArrowProps> = ({ direction, onClick, icon, ...rest }) => {
  const classes = classNames(styles.arrow, styles[`arrow_${direction}`]);
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {icon}
    </button>
  );
};
