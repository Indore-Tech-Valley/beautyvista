import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  if (typeof window === 'undefined') return null;

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(children, modalRoot) : null;
};

export default ModalPortal;
