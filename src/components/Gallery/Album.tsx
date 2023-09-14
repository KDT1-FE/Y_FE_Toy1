import React, {useEffect, useState} from "react";
import "../../styles/Gallery.css";
import {useParams} from "react-router-dom";
import ReadPhotos from "./ReadPhotos";
import AddPhotos from "./AddPhotos";

function Album() {
  const {id} = useParams<{id: string}>();
  const [albumKey, setAlbumKey] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   앨범 선택 함수 : URL파라미터 값에 따라 앨범 선택, URL파라미터 없을 경우 1번 앨범 선택
  const SelectAlbum = () => {
    if (id !== undefined) {
      setAlbumKey(id);
    } else {
      setAlbumKey("교육생 사진");
      ReadPhotos(albumKey)
        .then((photoFiles: string[]) => {
          setFiles(photoFiles); // 파일 목록을 설정
          setIsLoading(false);
        })
        .catch(err => {
          console.error("사진 로딩 중 오류 발생:", err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    SelectAlbum();
  }, [id]);

  useEffect(() => {
    if (albumKey) {
      setIsLoading(true); // 로딩 상태 설정
      ReadPhotos(albumKey)
        .then((photoFiles: string[]) => {
          setFiles(photoFiles); // 파일 목록을 설정
          setIsLoading(false);
        })
        .catch(err => {
          console.error("사진 로딩 중 오류 발생:", err);
          setIsLoading(false);
        });
    }
  }, [albumKey]);

  return (
    <div id="AlbumWrapper">
      <div id="AlbumHeader">
        <h1 id="AlbumTitle">앨범: {albumKey}</h1>
        <div id="AlbumIcons">
          <span className="material-symbols-outlined" id="AlbumDelete">
            delete
          </span>
          <span className="material-symbols-outlined" id="AlbumUpload">
            ios_share
          </span>
          <input type="file" id="testInput" />
        </div>
      </div>
      <div id="AlbumContainer">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          files.map(file => <AddPhotos key={file} file={file} />)
        )}
      </div>
    </div>
  );
}

export default Album;
