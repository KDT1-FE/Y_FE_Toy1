import React, {useState} from "react";
import {AddPhotosProps} from "../../types/Gallery";
import "../../styles/gallery/gallery.css";

function AddPhotos({file, name, deleteFiles, setDeleteFiles}: AddPhotosProps) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);

    if (!checked) {
      const updatedFiles = [...deleteFiles, file];
      setDeleteFiles(updatedFiles);
      localStorage.setItem("selected", JSON.stringify(updatedFiles));
    } else {
      const updatedFiles = deleteFiles.filter(item => item !== file);
      setDeleteFiles(updatedFiles);
      localStorage.setItem("selected", JSON.stringify(updatedFiles));
    }
  };

  return (
    <div className="Photo">
      <div className="PhotoImgDiv">
        <div className="PhotoContainer">
          <img
            className={`PhotoImg ${checked ? "checked" : ""}`}
            src={file}
            alt="Album"
          />
          <input
            type="checkbox"
            className="checkBox"
            onChange={handleCheck}
            checked={checked}
          />
          <div className="name">{name}</div>
        </div>
      </div>
    </div>
  );
}

export default AddPhotos;
