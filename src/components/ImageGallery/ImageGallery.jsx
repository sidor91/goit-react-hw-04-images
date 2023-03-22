import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import css from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';


const ImageGallery = ({ searchResult }) => {
  const [modal, showModal] = useState(false);
  const [largeImageURL, getLargeImageURL] = useState('');

  const closeModal = () => {
    showModal(false);
  };

  const clickHandler = e => {
    if (e.target === e.currentTarget) {
      return;
    }
    getLargeImageURL(e.target.getAttribute('data-url'));
    showModal(!modal);
  };

  return (
    <>
      <ul className={css.imageGallery} onClick={clickHandler}>
        {searchResult.map(({ id, webformatURL, tags, largeImageURL }) => (
          <GalleryItem
            key={id}
            url={webformatURL}
            title={tags}
            largeImage={largeImageURL}
          />
        ))}
      </ul>
      {modal && <Modal imageURL={largeImageURL} onClick={closeModal} />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};
