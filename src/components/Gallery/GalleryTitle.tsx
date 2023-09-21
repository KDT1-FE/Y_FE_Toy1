import React from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';

interface Props {
  setFormModalOpen: (isOpen: boolean) => void;
}

const GalleryTitle = ({ setFormModalOpen }: Props) => {
  return (
    <div className="gallery__top">
      {' '}
      <h1>갤러리</h1>
      <span className="gallery__top__add-btn">
        <BsPlusSquareFill
          onClick={() => {
            setFormModalOpen(true);
          }}
        />
      </span>
    </div>
  );
};

export default GalleryTitle;
