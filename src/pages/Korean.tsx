import React from 'react';
import GalleryListing from '../components/gallery/index';

const Korean = (): JSX.Element => {
  const category = 'korean';
  return <GalleryListing category={category} />;
};

export default Korean;
