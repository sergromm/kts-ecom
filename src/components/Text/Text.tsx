import classNames from 'classnames';
import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'h-32' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

export const Text: React.FC<TextProps> = ({
  className,
  view = 'p-16',
  tag = 'p',
  weight = 'normal',
  color = 'primary',
  maxLines,
  children,
}) => {
  const TagName = tag;
  const lineClamp = maxLines
    ? {
        WebkitLineClamp: maxLines,
      }
    : {};

  const classes = classNames(
    {
      'clamped-text': maxLines,
    },
    styles[`view_${view}`],
    styles[`weight_${weight}`],
    styles[`color_${color}`],
    styles[`max-lines`],
    className,
  );

  return (
    <TagName className={classes} style={lineClamp}>
      {children}
    </TagName>
  );
};
