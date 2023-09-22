import React from 'react';
import GalleryListing from '../components/gallery/index';

const Japanese = (): JSX.Element => {
  const category = 'japanese';
  return <GalleryListing category={category} />;
};

export default Japanese;
