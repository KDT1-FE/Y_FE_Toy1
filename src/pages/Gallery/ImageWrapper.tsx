import React from 'react';

interface ImageProps {
  imageUrl: string;
}

const ImageWrapper = ({ imageUrl }: ImageProps) => {
  return (
    <div
      style={{
        width: '30%',
        aspectRatio: "1",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '4px',
        marginBottom: "5%",
      }}
    />
  );
};

export default ImageWrapper;
