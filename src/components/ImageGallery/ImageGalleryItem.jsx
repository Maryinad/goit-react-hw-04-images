import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem(photos) {
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
      <GalleryImg
        onClick={handleToggleModal}
        src={photos.smallPhoto}
        alt={photos.alt}
      />
      {isOpenModal && (
        <Modal data={photos.info} closeModal={handleToggleModal} />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
