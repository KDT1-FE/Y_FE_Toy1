import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';
import {
  modalStyle,
  ModalContent,
  DeleteButton,
} from '../../styles/Gallery/GalleryModal';
import previewImg from '../../assets/images/previewImg.jpg';
import { AddButton } from '../../styles/Gallery/GalleryContent';

interface UploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onUpload: (selectedFile: File | null, name: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onRequestClose,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  /** 파일 변화 */
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.target.files != null) {
      const file = event.target.files[0];
      setSelectedFile(file);

      /** 미리보기 */
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 모달이 열릴 때 각 데이터 초기화
  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(undefined);
      setName('');
      setSelectedFile(null);
    }
  }, [isOpen]);

  /** input text 변화 */
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setName(event.target.value);
  };

  /** 업로드 */
  const handleUpload = (): void => {
    onUpload(selectedFile, name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      // Enter 키가 눌렸을 때 handleUpload 호출
      handleUpload();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <DeleteButton className="delete-btn" onClick={onRequestClose}>
        <MdClear />
      </DeleteButton>
      <ModalContent>
        <h1 className="title">이미지 업로드 📸</h1>
        <div className="main">
          <div className="choose-img-wrap">
            <h1 className="input-text">이미지를 선택해주세요</h1>
            <label htmlFor="input-img">
              <img className="preview-img" src={previewUrl ?? previewImg} />
            </label>
            <input
              type="file"
              id="input-img"
              className="input-img"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="input-name-wrap">
            <h1 className="input-text">이름을 작성해주세요</h1>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </ModalContent>
      <AddButton className="add-btn" onClick={handleUpload}>
        추가하기
      </AddButton>
    </Modal>
  );
};

export default UploadModal;
