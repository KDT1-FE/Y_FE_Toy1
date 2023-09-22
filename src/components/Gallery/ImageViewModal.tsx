import { useRef } from 'react';
import useOnClickOutside from '@hooks/gallery/useOnClickOutside';
import { UploadedImage } from '@components/Gallery/types';

import '@scss/components/gallery/modal.scss';
import '@scss/components/gallery/modalButton.scss';

const ImageViewModal = ({ imageDetail, setImgModalOpen }: ViewModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  //hooks
  useOnClickOutside(ref, () => {
    setImgModalOpen(false);
  });
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="view-modal modal" ref={ref}>
          <span onClick={() => setImgModalOpen(false)} className="modal__close">
            X
          </span>
          <div className="modal__content">
            <div className="modal__content__img-box">
              <img src={imageDetail.url} alt={imageDetail.id} width="100%" />
            </div>
            <div className="modal__content__text-box">
              <h2 className="modal__img-title">{imageDetail.title}</h2>
              <p>
                <b>작성일</b>: {imageDetail.timestamp.toString()}
              </p>
              <p>
                <b>작성자</b>: {imageDetail.username}
              </p>
              <p>
                <b>내용</b>: {imageDetail.content}
              </p>
              <p>
                <b>좋아요</b> : {imageDetail.like}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewModal;

interface ViewModalProps {
  imageDetail: UploadedImage;
  selectedImage: string;
  setImgModalOpen: (isOpen: boolean) => void;
}
