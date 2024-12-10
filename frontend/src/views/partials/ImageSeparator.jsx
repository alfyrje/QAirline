import React from 'react';
import PropTypes from 'prop-types';

const ImageSeparator = ({ imagePath }) => {
  const imageStyle = {
    width: '100%',
    height: '23rem',
    objectFit: 'cover',
  };

  return (
    <img
      src={imagePath}
      alt="Section separator"
      style={imageStyle}
    />
  );
};

ImageSeparator.propTypes = {
  imagePath: PropTypes.string.isRequired,
};

export default ImageSeparator;