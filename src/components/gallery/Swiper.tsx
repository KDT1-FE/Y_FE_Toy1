import React from 'react';
import { Modal } from './ModalComment';
import { GetImages } from '../../data/galleryImage';
//images 받아오기

interface Props {
  title: string;
  id: string;
  image?: string;
}

export function Swiper({ title, id }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        {GetImages.map((image) => (
          <div
            key={image.id}
            id={id}
            className="slide__images"
            onClick={() => Modal}
          >
            <img src={image.image} />
          </div>
        ))}
      </div>
    </div>
  );
}
