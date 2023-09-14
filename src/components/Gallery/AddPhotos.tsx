import React from "react";

interface AddPhotosProps {
  file: string;
}

function AddPhotos({file}: AddPhotosProps) {
  return (
    <div className="photo">
      <div className="photoImgDiv">
        <img className="photoImg" src={file} alt="Album" />
      </div>
    </div>
  );
}

export default AddPhotos;
