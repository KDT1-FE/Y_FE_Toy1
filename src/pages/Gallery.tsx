import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import "../styles/Gallery.css";
import Album from "../components/Gallery/Album";

function Gallery() {
  const {id} = useParams();
  const [isDefault, setDefault] = useState(true);

  useEffect(() => {
    id === undefined ? setDefault(true) : setDefault(false);
  }, [id]);
  return (
    <div className="GalleryWrapper">
      <div className="GallerySidebar">
        <span className="GalleryCategory">갤러리</span>
        <div className="GalleryListWrapper">
          <Link
            to="/gallery/교육생 사진"
            style={isDefault ? {color: "#ff648f", fontWeight: 600} : {}}
          >
            교육생 사진
          </Link>
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
