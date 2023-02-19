import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import { Overlay, ModalContainer } from './modal.styled';

export function Modal(closeModal, photos) {
  //   const { largeImageURL, tags } = data;
  //   console.log('data', data.largeImageURL);

  const onEscapePress = event => {
    // console.log(event.code === 'Escape');
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscapePress);

    return () => {
      window.removeEventListener('keydown', onEscapePress);
    };
  }, []);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.onEscapePress);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.onEscapePress);
  // }

  const onBackdropPress = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const { largeImageURL, tags } = photos.data;
  // console.log(largeImageURL, tags);
  return createPortal(
    <Overlay onClick={onBackdropPress}>
      <ModalContainer>
        <img src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  photos: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.object.isRequired,
  }),
};
