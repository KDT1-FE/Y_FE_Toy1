import React, {useState} from "react";
import {AddPhotosProps} from "../../types/Gallery";

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
        <input type="checkbox" onChange={handleCheck} checked={checked} />
        <img className="PhotoImg" src={file} alt="Album" />
        <p>{name}</p>
      </div>
    </div>
  );
}

export default AddPhotos;
