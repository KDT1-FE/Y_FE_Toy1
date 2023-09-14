import React, { useRef } from 'react';
import './Swiper.scss';
import { ModalComment } from './ModalComment';
import { GetImages } from '../../data/galleryImage';
//images 받아오기

interface Props {
  title: string;
  id: string;
  image?: string;
}

export function Swiper({ title, id }: Props) {
  const modalRef: any = useRef();

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        {GetImages.map((image) => (
          <div
            key={image.id}
            id={id}
            className="slide__images"
            onClick={() => modalRef.current?.showModal()}
          >
            <img src={image.image} />

            <dialog ref={modalRef}>
              <h1>Comment Page</h1>

              <ModalComment image={image.image} />

              <button
                onClick={() => modalRef.current?.close()} // 📍 모달 닫기
              >
                Close
              </button>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
