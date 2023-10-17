import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ image, onClick }) => (
  <li className="ImageGalleryItem">
    <img src={image.webformatURL} alt={image.tags} onClick={onClick} className="ImageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
