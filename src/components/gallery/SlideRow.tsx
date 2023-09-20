import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { getImageData } from '../../data/galleryImage';
import { MapImages } from './SlideOpenModal';
import './SlideRow.scss';

interface ISlide {
  categoryId: string;
  slideClassName: string;
  cateEmoji: string;
  slideContent: string;
}

export function CarouselSlide({
  categoryId,
  slideClassName,
  cateEmoji,
  slideContent,
}: ISlide): JSX.Element {
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
      <h2>
        {cateEmoji} {categoryId}
      </h2>
      <span className="slide-cate-content"> {slideContent}</span>

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
