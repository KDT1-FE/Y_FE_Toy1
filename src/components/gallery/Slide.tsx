import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Slide.scss';
import { getImageData } from '../../data/galleryImage';
import { MapImages } from './MapImages';
//images 받아오기

interface Props {
  categoryId: string;
  image?: string;
  slideClassName: string;
}

export function CarouselSlide({
  categoryId,
  slideClassName,
}: Props): JSX.Element {
  const imageData = getImageData(categoryId);
  const [imageDataInfo, setImageDataInfo]: any = useState();

  React.useEffect(() => {
    imageData.then((item: any) => {
      setImageDataInfo(item);
    });
  }, []);

  useEffect(() => {
    gsap.to('.leftSlideItem', {
      x: -1200,
      duration: 15,
      repeat: -1,
      repeatDelay: 0,
      ease: 'none',
      draggable: true,
    });
    gsap.to('.rightSlideItem', {
      x: 700,
      duration: 10,
      repeat: -1,
      repeatDelay: 0,
      ease: 'none',
    });
  }, []);

  return (
    <div className="slide-row">
      <h2>{categoryId}</h2>

      <div className={slideClassName}>
        {imageDataInfo?.map((image: any) => (
          <MapImages
            key={image.timestamp}
            image={image}
            commentsListData={image.comments}
            categoryId={categoryId}
            userId={image.uid}
            nickName={image.nickname}
            like={image.like}
            slideClassName={slideClassName}
          />
        ))}
      </div>
    </div>
  );
}
