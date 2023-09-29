import { AnimatePresence, motion, wrap } from 'framer-motion';
import * as React from 'react';
import { ArrowLeftIcon } from 'components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from 'components/icons/ArrowRightIcon';
import { useMeasure } from 'hooks/useMeasure';
import { SliderArrow } from './SliderArrow';
import styles from './Slider.module.scss';

type SliderProps = {
  images: string[];
  title: string;
  reverse?: boolean;
};

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

const Slider: React.FC<SliderProps> = ({ images, title, reverse, ...rest }) => {
  const [[slide, direction], setSlide] = React.useState([reverse ? images.length - 1 : 0, 0]);
  const { ref, measures } = useMeasure<HTMLImageElement>();
  const width = measures?.width;
  const index = wrap(0, images.length, slide);
  const nextSlide = React.useCallback(
    (newDirection: number) => {
      setSlide([slide + newDirection, newDirection]);
    },
    [slide],
  );

  return (
    <div className={styles.slider} {...rest}>
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
          }}
          variants={variants}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            e.stopImmediatePropagation();
            if (swipe < -swipeConfidenceThreshold) {
              nextSlide(1);
            } else if (swipe > swipeConfidenceThreshold) {
              nextSlide(-1);
            }
          }}
        />
      </AnimatePresence>
      <SliderArrow direction="left" icon={<ArrowLeftIcon height={31} width={31} />} onClick={() => nextSlide(-1)} />
      <SliderArrow direction="right" icon={<ArrowRightIcon height={31} width={31} />} onClick={() => nextSlide(1)} />
    </div>
  );
};

export default Slider;
