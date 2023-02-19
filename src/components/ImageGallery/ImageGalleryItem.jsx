import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
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
      <GalleryImg onClick={handleToggleModal} src={webformatURL} alt={tags} />
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          closeModal={handleToggleModal}
          alt={tags}
        />
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
