import React, { useRef, useState } from 'react';
import './Swiper.scss';

import { getImageData } from '../../data/galleryImage';
import { MapImages } from './MapImages';
//images 받아오기

interface Props {
  categoryId: string;
  image?: string;
}

export function Swiper({ categoryId }: Props) {
  const imageData = getImageData(categoryId);
  const [imageDataInfo, setImageDataInfo]: any = useState();

  React.useEffect(() => {
    imageData.then((item: any) => {
      setImageDataInfo(item);
    });
  }, []);

  return (
    <div>
      <h2>{categoryId}</h2>

      <div className="slider">
        {imageDataInfo?.map((image: any) => (
          // let commentsListData={image.comments};

          // commentsListData.comments.map(()=>{
          //   <li>{comment}</li>
          // })

          <MapImages
            key={image.id}
            image={image}
            commentsListData={image.comments}
            categoryId={categoryId}
            userId={image.uid}
            nickName={image.nickname}
          />
        ))}
      </div>
    </div>
  );
}
