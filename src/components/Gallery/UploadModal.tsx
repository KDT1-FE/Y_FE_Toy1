import React from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import "../../styles/UploadModal.css";
import {UploadDeleteModalProps} from "../../types/Modal";
import PostPhotos from "./PostPhotos";

export default function UploadModal({
  onClose,
  albumKey,
}: UploadDeleteModalProps) {
  return (
    <div className="ModalBackdrop">
      <div className="TimerModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>사진 업로드</p>
        <input
          type="file"
          className="InputFile"
          onChange={e => PostPhotos(e, albumKey)}
        />
        <button type="button" className="CancelButton" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="OKButton" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
