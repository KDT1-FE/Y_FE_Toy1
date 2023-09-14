import React from "react";
import "../../styles/Wiki.css";
import {EditButtonProps} from "../../types/Wiki";

function EditButton({isEditorOpen, setIsEditorOpen}: EditButtonProps) {
  const clickEdit = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  return (
    <button
      className="WikiButton"
      type="button"
      onClick={clickEdit}
      style={{
        backgroundColor: isEditorOpen ? "rgba(255, 55, 115, 0.8)" : "#34576d",
      }}
    >
      {isEditorOpen ? "수정취소" : "수정하기"}
    </button>
  );
}

export default EditButton;
