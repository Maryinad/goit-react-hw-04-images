import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, alt, largeImageURL }) {
  // console.log(webformatURL, tags, largeImageURL);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // console.log(children);
  // state = {
  //   isOpenModal: false,
  // };

  const handleToggleModal = () => {
    setIsOpenModal(prevState => !prevState);

    // this.setState(prevState => ({
    //   isOpenModal: !prevState.isOpenModal,
    // }));
  };

  return (
    <GalleryItem>
      <GalleryImg onClick={handleToggleModal} src={webformatURL} alt={alt} />
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          closeModal={handleToggleModal}
          alt={alt}
        />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
