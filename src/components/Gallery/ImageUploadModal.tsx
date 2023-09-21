import { Dispatch, SetStateAction, useRef } from 'react';
import useOnClickOutside from '../../hooks/gallery/useOnClickOutside';
import { ImageUploadPayload } from './types';

import '../../scss/components/gallery/modal.scss';
import '../../scss/components/gallery/modalButton.scss';

interface Props {
  setFormModalOpen: (isOpen: boolean) => void;
  closeFormModal: () => void;
  setImageFileToUpload: Dispatch<SetStateAction<File | null>>;
  imageUploadPayload: ImageUploadPayload;
  setImageUploadPayload: Dispatch<SetStateAction<ImageUploadPayload>>;
  handleImageUploadClick: () => void;
}

const ImageUploadModal = ({
  setFormModalOpen,
  closeFormModal,
  setImageFileToUpload,
  imageUploadPayload,
  setImageUploadPayload,
  handleImageUploadClick,
}: Props) => {
  const ref = useRef();
  // console.log('uploadRef', ref.current);
  useOnClickOutside(ref, () => {
    setFormModalOpen(false);
  });
  return (
    <div className="presentation dim" role="presentation">
      <div className="wrapper-modal">
        <div className="modal shadow upload-modal" ref={ref as any}>
          <h2 className="modal__title">Upload your Image !</h2>
          <span onClick={() => closeFormModal()} className="modal__close">
            X
          </span>
          <div className="modal__content">
            <input
              type="text"
              placeholder="제목을 입력해 주세요"
              onChange={event => {
                setImageUploadPayload({
                  ...imageUploadPayload,
                  title: event.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="작성자"
              onChange={event => {
                setImageUploadPayload({
                  ...imageUploadPayload,
                  username: event.target.value,
                });
              }}
            />
            <textarea
              placeholder="내용을 입력해주세요"
              onChange={event => {
                setImageUploadPayload({
                  ...imageUploadPayload,
                  content: event.target.value,
                });
              }}
            />
            <div className="modal__file-box">
              <label htmlFor="file">파일찾기</label>
              <input
                type="file"
                id="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setImageFileToUpload(event.target.files?.[0] ?? ({} as File));
                }}
              />
            </div>
            <button className="modal__button" onClick={handleImageUploadClick}>
              upload image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
