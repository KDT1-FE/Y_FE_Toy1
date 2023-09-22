import { UploadedImage } from './types';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaHeartCirclePlus, FaHeartCircleMinus } from 'react-icons/fa6';

const ImageList = ({ docList, likeImage, hateImage, deleteData, onImageClick }: ImgListProps) => {
  return (
    <div className="inner">
      {docList.map((item: UploadedImage, index: number) => {
        return (
          <figure
            className="shadow"
            key={item.id}
            style={{ backgroundImage: `url(${item.url})` }}
            onClick={() => {
              onImageClick(index);
            }}>
            <figcaption>
              <h3>{item.title}</h3>
              <div className="icon-wrap">
                <div className="like-icon">
                  <FaHeartCirclePlus
                    className={`icon ${item.like > 0 ? 'active' : null}`}
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      likeImage(item.id, item.like);
                    }}
                  />
                  <FaHeartCircleMinus
                    className="icon minus"
                    onClick={(event: React.MouseEvent) => {
                      event.stopPropagation();
                      hateImage(item.id, item.like);
                    }}
                  />
                  <span>좋아요: {item.like} </span>
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

interface ImgListProps {
  docList: UploadedImage[];
  onImageClick: (index: number) => void;
  likeImage: (id: string, like: number) => void;
  hateImage: (id: string, like: number) => void;
  deleteData: (id: string) => void;
}
