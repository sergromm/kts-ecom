import classNames from 'classnames';
import * as React from 'react';
import { ImageWithBlur } from 'components/Image';
import { Text } from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode | string;
  /**  Блюр картинки */
  hash: string;
  /** Подгонка обложки */
  fit?: 'cover' | 'contain';
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Регулируеот отступы */
  size?: 'normal' | 'small';
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
  hash,
  size = 'normal',
  fit = 'contain',
  captionSlot,
  actionSlot,
  contentSlot,
  className,
  ...rest
}) => {
  const altText = typeof title === 'string' ? title : '';
  const classes = classNames(styles.container, className);
  const bodyClasses = classNames(styles.body, { [styles.body_small]: size === 'small' });
  return (
    <div className={classes} {...rest}>
      <ImageWithBlur
        alt={altText}
        className={styles.cover}
        fit={fit}
        hash={hash}
        height={'100%'}
        src={image}
        width={'100%'}
      />
      <div className={bodyClasses}>
        <div className={styles.description}>
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
          <div className={styles.footer}>
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
