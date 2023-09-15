import React from "react";
import {AddPhotosProps} from "../../types/Gallery";

function AddPhotos({file}: AddPhotosProps) {
  return (
    <div className="Photo">
      <div className="PhotoImgDiv">
        <img className="PhotoImg" src={file} alt="Album" />
      </div>
    </div>
  );
}

export default AddPhotos;
