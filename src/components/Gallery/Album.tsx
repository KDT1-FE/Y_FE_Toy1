import React, {useEffect, useState} from "react";
import "../../styles/Gallery.css";
import {useParams} from "react-router-dom";
import Modal from "../Modal/Modal";
import DeleteModal from "./DeleteModal";
import useModal from "../../hooks/useModal";
import ReadPhotos from "./ReadPhotos";
import AddPhotos from "./AddPhotos";
import UploadModal from "./UploadModal";

function Album() {
  const {id} = useParams<{id: string}>();
  const {isOpen, toggle} = useModal();
  const [albumKey, setAlbumKey] = useState<string>("");
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<{name: string; imageUrl: string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [deleteFiles, setDeleteFiles] = useState<string[]>([]);

  //   앨범 선택 함수 : URL파라미터 값에 따라 앨범 선택, URL파라미터 없을 경우 1번 앨범 선택
  const SelectAlbum = () => {
    if (id !== undefined) {
      setAlbumKey(id);
    } else {
      setAlbumKey("교육생 사진");
    }
  };

  useEffect(() => {
    SelectAlbum();
  }, [id]);

  useEffect(() => {
    SelectAlbum();
    if (albumKey.length > 0)
      ReadPhotos(albumKey)
        .then(photoFiles => {
          const imageUrlArray = photoFiles.map(photo => photo.imageUrl);
          setAllFiles(imageUrlArray);
          setFiles(photoFiles);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          throw new Error(err);
        });
  }, [albumKey]);

  const ChangeModalTrue = () => {
    setIsModal(true);
  };

  const ChangeModalFalse = () => {
    setIsModal(false);
  };

  return (
    <div id="AlbumWrapper">
      <div id="AlbumHeader">
        <h1 id="AlbumTitle">앨범: {albumKey}</h1>
        <div id="AlbumIcons">
          <button
            type="button"
            className="material-symbols-outlined"
            id="AlbumDelete"
            onClick={() => {
              toggle();
              ChangeModalFalse();
            }}
          >
            delete
          </button>
          <button
            type="button"
            className="material-symbols-outlined"
            id="AlbumUpload"
            onClick={() => {
              toggle();
              ChangeModalTrue();
            }}
          >
            ios_share
          </button>
        </div>
      </div>
      <div id="AlbumContainer">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          files.map(file => (
            <AddPhotos
              key={file.imageUrl}
              file={file.imageUrl}
              name={file.name}
              deleteFiles={deleteFiles}
              setDeleteFiles={setDeleteFiles}
            />
          ))
        )}
      </div>
      <Modal isOpen={isOpen} onClose={toggle}>
        {isModal ? (
          <UploadModal onClose={toggle} albumKey={albumKey} />
        ) : (
          <DeleteModal
            onClose={toggle}
            albumKey={albumKey}
            allArray={allFiles}
          />
        )}
      </Modal>
    </div>
  );
}

export default Album;
