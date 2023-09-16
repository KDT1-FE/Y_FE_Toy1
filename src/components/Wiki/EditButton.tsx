import React from "react";
import "../../styles/Wiki.css";
import {EditButtonProps} from "../../types/Wiki";
import {ReactComponent as Icon} from "../../assets/icons/EditBtn.svg";

function EditButton({isEditorOpen, setIsEditorOpen}: EditButtonProps) {
  const clickEdit = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  return <Icon className="EditButton" onClick={clickEdit} />;
}

export default EditButton;
