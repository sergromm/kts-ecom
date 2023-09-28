import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as React from 'react';

import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

type ModalProps = {
  onClose: () => void;
  open: boolean;
  handleOpen: (value: boolean) => void;
};

const CLOSE_THRESHOLD = window.innerHeight * 0.6;
const MAX_VELOCITY = 300;

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ open, handleOpen, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const y = useMotionValue(0);
  const ySmooth = useSpring(y, { damping: 50, stiffness: 400 });
  const opacity = useTransform(ySmooth, [0, 500], [1, 0], {
    clamp: false,
  });

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

  return (
    <>
      <motion.button className={styles.trigger} onClick={() => handleOpen(true)}>
        open
      </motion.button>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div className={styles.root} key="modal-root" transition={{ type: 'tween' }}>
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                className={styles.content}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={1}
                exit={{ y: 50, opacity: 0 }}
                initial={{ y: 50, opacity: 0 }}
                key="modal-content"
                ref={modalRef}
                style={{ y }}
                transition={{ type: 'tween', duration: 0.3 }}
                dragPropagation
                dragSnapToOrigin
                onDragEnd={(_, { velocity, offset }) => {
                  if (offset.y >= CLOSE_THRESHOLD || velocity.y > MAX_VELOCITY) {
                    onClose();
                    opacity.set(0);
                  }
                }}
              >
                {children}
              </motion.div>
              <motion.div
                animate={{ opacity: 1 }}
                className={styles.overlay}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key="modal-overlay"
                style={{ opacity }}
                onClick={onClose}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};
