import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ imageURL, onClick }) => {

  useEffect(() => {
    const escPress = e => {
      e.code === 'Escape' && onClick();
    };

    window.addEventListener('keydown', escPress);
    return () => {
      window.removeEventListener('keydown', escPress);
    };
  }, [onClick]);

  const backdropClickHandler = e => {
      e.target === e.currentTarget && onClick();
    };
  
  return (
    <div className={css.overlay} onClick={backdropClickHandler}>
      <div className={css.modal}>
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;