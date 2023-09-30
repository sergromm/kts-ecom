import classnames from 'classnames';
import { AnimatePresence, MotionValue, motion } from 'framer-motion';
import * as React from 'react';
import styles from './Modal.module.scss';

type ModalProps = {
  open: boolean;
  position: 'center' | 'right';
  // handleOpen: (value: boolean) => void;
};

type OverlayProps = {
  opacity?: MotionValue<number>;
  handleClose: () => void;
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
      transition={{ type: 'tween', duration: 0.4 }}
      onClick={handleClose}
    />
  );
};

export const Content = React.forwardRef<HTMLDivElement, React.PropsWithChildren>((props, ref) => {
  return (
    <div className={styles.content} ref={ref}>
      {props.children}
    </div>
  );
});
Content.displayName = 'Content';

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ open, position, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      if (window.navigator.userAgent.includes('Chrome')) {
        document.body.style.paddingRight = '8px';
      }
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
          <motion.div className={classes} key="modal-root">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
