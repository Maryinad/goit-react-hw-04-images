import PropTypes from 'prop-types';

import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ photosData }) => {
  return (
    <ImageGalleryList>
      {photosData.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  photosData: PropTypes.array.isRequired,
};
