import React from "react";
import "../../styles/wiki/wiki.css";
import {EditButtonProps} from "../../types/Wiki";
import {ReactComponent as EditIcon} from "../../assets/icons/EditBtn.svg";
import {ReactComponent as CancelIcon} from "../../assets/icons/Cancel.svg";

function EditButton({isEditorOpen, setIsEditorOpen}: EditButtonProps) {
  const clickEdit = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  return (
    <div>
      {isEditorOpen ? (
        <div title="취소하기">
          <CancelIcon className="ButtonIcon" onClick={clickEdit} />
        </div>
      ) : (
        <div title="수정하기">
          <EditIcon className="ButtonIcon" onClick={clickEdit} />
        </div>
      )}
    </div>
  );
}

export default EditButton;
