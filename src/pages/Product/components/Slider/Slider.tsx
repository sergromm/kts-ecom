import { AnimatePresence, motion, wrap } from 'framer-motion';
import * as React from 'react';
import { Icon } from 'components/icons/Icon';
import { useMeasure } from 'hooks/useMeasure';
import styles from './Slider.module.scss';

type SliderProps = { images: string[]; title: string };

const variants = {
  enter: ({ direction, width }: { direction: number; width: number }) => {
    return {
      x: direction > 0 ? width : -width,
      scale: 0.9,
    };
  },
  center: {
    scale: 1,
    x: 0,
    zIndex: 1,
  },
  exit: ({ direction, width }: { direction: number; width: number }) => {
    return {
      scale: 0.9,
      x: direction < 0 ? width : -width,
      zIndex: 0,
    };
  },
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Slider({ images, title }: SliderProps) {
  const [[slide, direction], setSlide] = React.useState([0, 0]);
  const { ref, measures } = useMeasure<HTMLImageElement>();

  const width = measures?.width;
  const index = wrap(0, images.length, slide);

  const nextSlide = (newDirection: number) => {
    setSlide([slide + newDirection, newDirection]);
  };

  return (
    <div className={styles.slider}>
      <AnimatePresence custom={{ direction, width }} initial={false} mode="wait">
        <motion.img
          alt={title}
          animate="center"
          className={styles.image}
          custom={{ direction, width }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          exit="exit"
          initial="enter"
          key={slide}
          ref={ref}
          src={images[index]}
          transition={{
            x: { type: 'tween' },
            duration: 0.1,
            // opacity: { duration: 0.4 },
          }}
          variants={variants}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide(1);
            } else if (swipe > swipeConfidenceThreshold) {
              nextSlide(-1);
            }
          }}
        />
      </AnimatePresence>
      <button className={`${styles.arrow} ${styles.arrow_left}`} onClick={() => nextSlide(-1)}>
        <Icon height={31} width={31}>
          <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </button>
      <button className={`${styles.arrow} ${styles.arrow_right}`} onClick={() => nextSlide(1)}>
        <Icon height={31} width={31}>
          <svg fill="none" height="31" viewBox="0 0 31 31" width="31" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </button>
    </div>
  );
}
