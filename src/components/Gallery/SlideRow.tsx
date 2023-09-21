import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { getImageData } from '../../data/galleryImage';
import './SlideRow.scss';
import { MapImages } from './SlideOpenModal';

export interface ISlide {
  categoryId: string;
  slideClassName: string;
  cateEmoji: string;
  slideContent: string;
}

export interface IImageData {
  id: string;
  image: any;
  timestamp: string;
  comments: Array<object>;
  uid: string;
  nickname: string;
  like: number;
}

export function CarouselSlide({
  categoryId,
  slideClassName,
  cateEmoji,
  slideContent,
}: ISlide): JSX.Element {
  const imageData = getImageData(categoryId);
  const [imageDataInfo, setImageDataInfo] = useState<IImageData[]>();

  useEffect(() => {
    imageData.then((item) => {
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
        {imageDataInfo?.map((image: IImageData) => (
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
