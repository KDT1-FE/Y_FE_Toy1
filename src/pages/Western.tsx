import React from 'react';
import GalleryListing from '../components/gallery/index';

const Western = (): JSX.Element => {
  const category = 'western';
  return <GalleryListing category={category} />;
};

export default Western;
