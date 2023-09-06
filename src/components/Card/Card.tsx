import React from 'react';
import Text from '../Text';
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

const Card: React.FC<CardProps> = ({
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
  return (
    <div className={`container ${className}`} {...rest}>
      <img className="cover" src={image} alt={altText} />
      <div className="body">
        <div className="description">
          {captionSlot && (
            <Text view="p-14" color="secondary" weight="medium" maxLines={2}>
              {captionSlot}
            </Text>
          )}
          <Text view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className="footer">
          {contentSlot && (
            <Text view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot && actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
