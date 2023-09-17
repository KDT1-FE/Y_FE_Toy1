import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Slide.scss';
import { getImageData } from '../../data/galleryImage';
import { MapImages } from './MapImages';
//images 받아오기

interface Props {
  categoryId: string;
  image?: string;
}

export function Slide({ categoryId }: Props) {
  const imageData = getImageData(categoryId);
  const [imageDataInfo, setImageDataInfo]: any = useState();

  React.useEffect(() => {
    imageData.then((item: any) => {
      setImageDataInfo(item);
    });
  }, []);

  useEffect(() => {
    gsap.to('.slide-card', {
      x: -1200,
      duration: 15,
      repeat: -1,
      repeatDelay: 0,
      ease: 'none',
    });
  }, []);

  return (
    <div className="slide-row">
      <h2>{categoryId}</h2>

      <div className="slide-card">
        {imageDataInfo?.map((image: any) => (
          <MapImages
            key={image.id}
            image={image}
            commentsListData={image.comments}
            categoryId={categoryId}
            userId={image.uid}
            nickName={image.nickname}
            like={image.like}
          />
        ))}
      </div>
    </div>
  );
}
