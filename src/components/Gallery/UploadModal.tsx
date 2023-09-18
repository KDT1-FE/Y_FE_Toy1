import React, {useState} from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import "../../styles/UploadModal.css";
import {UploadModalProps} from "../../types/Modal";
import PostPhotos from "./PostPhotos";

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
        <input type="file" className="InputFile" onChange={handleFileChange} />
        <input type="text" className="InputName" onChange={handleNameChange} />
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
