import React from "react";
import {Link} from "react-router-dom";
import "../styles/Gallery.css";
import Album from "../components/Gallery/Album";

function Gallery() {
  return (
    <div className="GalleryWrapper">
      <div className="GallerySidebar">
        <span className="GalleryCategory">갤러리</span>
        <div className="GalleryListWrapper">
          <Link to="/gallery/교육생 사진">교육생 사진</Link>
          <Link to="/gallery/계열사">계열사</Link>
        </div>
      </div>
      <div className="GalleryContentSection">
        <Album />
      </div>
    </div>
  );
}

export default Gallery;
