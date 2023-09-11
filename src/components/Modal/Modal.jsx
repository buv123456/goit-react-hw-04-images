import { useEffect } from 'react';
import { ModalStyled, ModalWrapStyled } from './ModalStyled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, onClose }) {
  useEffect(() => {
    const handleCloseESC = e => {
      if (e.code === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleCloseESC);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleCloseESC);
    };
  }, [onClose]);

  const handleClose = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <ModalWrapStyled onClick={handleClose}>
      <ModalStyled>{children}</ModalStyled>
    </ModalWrapStyled>,
    modalRoot
  );
}
