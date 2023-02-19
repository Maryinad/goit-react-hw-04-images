import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalContainer } from './modal.styled';

export function Modal({ closeModal, largeImageURL, alt }) {
  //   const { largeImageURL, tags } = data;
  //   console.log('data', data.largeImageURL);

  useEffect(() => {
    const onEscapePress = event => {
      // console.log(event.code === 'Escape');
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', onEscapePress);

    return () => {
      window.removeEventListener('keydown', onEscapePress);
    };
  }, [closeModal]);

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

  // console.log(largeImageURL, alt);
  return createPortal(
    <Overlay onClick={onBackdropPress}>
      <ModalContainer>
        <img src={largeImageURL} alt={alt} />
      </ModalContainer>
    </Overlay>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
