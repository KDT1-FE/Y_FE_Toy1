import React, {useState} from "react";
import "../../styles/modal.css";
import "../../styles/timer/timerModal.css";
import "../../styles/gallery/uploadModal.css";
import {UploadModalProps} from "../../types/Modal";
import PostPhotos from "./PostPhotos";
import UploadImg from "../../assets/images/uploadImg.jpeg";

function UploadModal({onClose, albumKey}: UploadModalProps) {
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const [currentName, setCurrentName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowFile = e.currentTarget.files?.[0];
    setCurrentFile(nowFile);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowName = e.currentTarget.value;
    setCurrentName(nowName);
  };

  const handleUpload = () => {
    if (currentFile) {
      PostPhotos(currentFile, currentName, albumKey);
      onClose();
    }
  };

  return (
    <div className="ModalBackdrop">
      <div className="TimerModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>사진 업로드</p>
        <div className="InnerModalContent">
          <label htmlFor="fileInput">
            <img src={UploadImg} alt="업로드이미지" />
            <input
              type="file"
              id="fileInput"
              className="InputFile"
              onChange={handleFileChange}
              style={{display: "block"}}
              aria-label="사진 선택"
            />
          </label>
          <input
            type="text"
            className="InputName"
            onChange={handleNameChange}
            placeholder="사진에 이름을 넣어주세요!"
          />
        </div>
        <button type="button" className="CancelButton" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="OKButton" onClick={handleUpload}>
          OK
        </button>
      </div>
    </div>
  );
}

export default UploadModal;
