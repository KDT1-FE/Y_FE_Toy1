import React, {useEffect, useState} from "react";
import "../../styles/Gallery.css";
import {useParams} from "react-router-dom";

function Album() {
  const {id} = useParams() as {id: string};
  const [albumKey, setAlbumKey] = useState("");

  //   앨범 선택 함수 : URL파라미터 값에 따라 앨범 선택, URL파라미터 없을 경우 1번 앨범 선택
  const SelectAlbum = () => {
    if (id !== undefined) {
      setAlbumKey(id);
    } else {
      setAlbumKey("직원사진");
    }
  };

  useEffect(() => {
    SelectAlbum();
  }, [id]);

  return (
    <div id="AlbumWrapper">
      <h1 id="AlbumTitle">Album: {albumKey}</h1>
      <div id="AlbumContainer">{albumKey} 앨범 정렬</div>
    </div>
  );
}

export default Album;
