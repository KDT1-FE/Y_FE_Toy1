import React from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import "../../styles/DeleteModal.css";
import {DeleteModalProps} from "../../types/Modal";
import DeletePhotos from "./DeletePhotos";

export default function DeleteModal({
  onClose,
  albumKey,
  allArray,
}: DeleteModalProps) {
  const selectedString = localStorage.getItem("selected") as string;
  const selectedArray = JSON.parse(selectedString);
  return (
    <div className="ModalBackdrop">
      <div className="TimerModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>사진 삭제</p>
        <div className="DeleteModalDes">선택된 사진들은 삭제됩니다.</div>
        <button type="button" className="CancelButton" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="OKButton"
          onClick={() => {
            DeletePhotos(albumKey, allArray, selectedArray);
            onClose();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
