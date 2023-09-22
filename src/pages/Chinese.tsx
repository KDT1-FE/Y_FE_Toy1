import React from 'react';
import GalleryListing from '../components/gallery/index';

const Chinese = (): JSX.Element => {
  const category = 'chinese';
  return <GalleryListing category={category} />;
};

export default Chinese;
