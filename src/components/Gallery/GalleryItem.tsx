// import React, { useState } from 'react';
import { type ImageData } from './GalleryContent';
import { Item, DeleteButton } from '../../styles/Gallery/GalleryItem';
import { MdClear } from 'react-icons/md';
import { useAuthState } from '../../shared/contexts/AuthContext';

interface GalleryItemProps {
  image: ImageData;
  deleteData: (image: ImageData) => void;
}

export default function GalleryItem({
  image,
  deleteData,
}: GalleryItemProps): JSX.Element {
  const authState = useAuthState();

  return (
    <>
      <Item>
        <div className="item-wrap" key={image.id}>
          <div className="image-container">
            <img className="image" src={image.imageUrl} alt={image.name} />
          </div>
          <p className="image-name">{image.name}</p>
          {authState.state === 'loaded' && authState.isAuthentication && (
            <DeleteButton
              className="delete-btn"
              onClick={() => {
                deleteData(image);
              }}
            >
              <MdClear />
            </DeleteButton>
          )}
        </div>
      </Item>
    </>
  );
}
