import React from "react";
import {Link} from "react-router-dom";
import "../styles/Gallery.css";
import Album from "../components/Gallery/Album";

function Gallery() {
  return (
    <div className="GalleryWrapper">
      <div className="GallerySidebar">
        <span className="GalleryCategory">갤러리</span>
        <div className="CategoryListWrapper">
          <Link to="/gallery/직원사진">직원사진</Link>
          <Link to="/gallery/협력사">협력사</Link>
        </div>
      </div>
      <div className="GalleryContentSection">
        <Album />
      </div>
    </div>
  );
}

export default Gallery;
