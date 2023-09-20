import React from 'react';
import { UploadedImage } from './types';
import { BsFillTrashFill, BsFillHeartFill } from 'react-icons/bs';
interface ImgListProps {
  docList: UploadedImage[];
  onImageClick: (index: number) => void;
  likeImage: (id: string, like: number) => void;
  deleteData: (id: string) => void;
}

const ImageList = ({ docList, likeImage, deleteData, onImageClick }: ImgListProps) => {
  return (
    <div className="inner">
      {docList.map((item: UploadedImage, index: number) => {
        return (
          <figure
            className="shadow"
            key={item.id}
            style={{ backgroundImage: `url(${item.url})` }}
            onClick={() => {
              // console.log('클릭클릭');
              onImageClick(index);
            }}>
            <figcaption>
              <h3>{item.title}</h3>
              <div className="icon-wrap">
                <div className="like-icon">
                  <BsFillHeartFill
                    className="icon"
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      likeImage(item.id, item.like);
                    }}
                  />
                  <span> {item.like}</span>
                </div>

                <BsFillTrashFill
                  className="icon"
                  onClick={(event: React.MouseEvent) => {
                    event.stopPropagation();
                    deleteData(item.id);
                  }}
                />
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
};

export default ImageList;
