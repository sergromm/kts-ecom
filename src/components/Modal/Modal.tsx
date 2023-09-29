import classnames from 'classnames';
import { AnimatePresence, MotionValue, PanInfo, motion } from 'framer-motion';
import * as React from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  open: boolean;
  position: 'center' | 'right';
  // handleOpen: (value: boolean) => void;
};

type OverlayProps = {
  opacity: MotionValue<number>;
  handleClose: () => void;
};

type ContentProps = {
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  y: MotionValue<number>;
};

export const Overlay: React.FC<OverlayProps> = ({ opacity, handleClose }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={styles.overlay}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="modal-overlay"
      style={{ opacity }}
      onClick={handleClose}
    />
  );
};

export const Content: React.FC<React.PropsWithChildren<ContentProps>> = ({ handleDragEnd, y, children }) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      className={styles.content}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      key="modal-content"
      ref={modalRef}
      style={{ y }}
      transition={{ type: 'tween', duration: 0.3 }}
      dragPropagation
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
};

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ open, position, children }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (window.navigator.userAgent.includes('Chrome')) {
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.removeProperty('padding-right');
    };
  }, [open]);

  const classes = classnames(styles.root, { [styles[`position_${position}`]]: position });

  return (
    <>
      {/* <motion.button className={styles.trigger} onClick={() => handleOpen(true)} /> */}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className={classes}
            exit={{ y: 100, opacity: 0 }}
            initial={{ y: 100, opacity: 0 }}
            key="modal-root"
            transition={{ type: 'tween' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      ,
    </>
  );
};
