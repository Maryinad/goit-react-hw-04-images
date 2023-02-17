import PropTypes from 'prop-types';

import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ photosData }) => {
  return (
    <ImageGalleryList>
      {photosData.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          smallPhoto={photo.webformatURL}
          alt={photo.tags}
          info={photo}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  photosData: PropTypes.array.isRequired,
};
