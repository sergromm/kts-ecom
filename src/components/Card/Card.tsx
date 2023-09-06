import classNames from 'classnames';
import * as React from 'react';
import { Text } from '../Text';
import './Card.styles.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode | string;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  captionSlot,
  actionSlot,
  contentSlot,
  className,
  ...rest
}) => {
  const altText = typeof title === 'string' ? title : '';
  const classes = classNames('container', className);
  return (
    <div className={classes} {...rest}>
      <img alt={altText} className="cover" src={image} />
      <div className="body">
        <div className="description">
          {captionSlot && (
            <Text color="secondary" maxLines={2} view="p-14" weight="medium">
              {captionSlot}
            </Text>
          )}
          <Text maxLines={2} view="p-20" weight="medium">
            {title}
          </Text>
          <Text color="secondary" maxLines={3} view="p-16">
            {subtitle}
          </Text>
        </div>
        {contentSlot && (
          <div className="footer">
            <Text view="p-18" weight="bold">
              {contentSlot}
            </Text>
            {actionSlot && actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};
