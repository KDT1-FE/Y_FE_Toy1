import React, {useEffect, useState} from "react";
import "../../styles/gallery/gallery.css";
import {useParams} from "react-router-dom";
import Modal from "../Modal";
import Loading from "../Loading";
import DeleteModal from "./DeleteModal";
import useModal from "../../hooks/useModal";
import ReadPhotos from "./ReadPhotos";
import AddPhotos from "./AddPhotos";
import UploadModal from "./UploadModal";
import {ReactComponent as DeleteBtn} from "../../assets/icons/DeleteBtn.svg";
import {ReactComponent as Upload} from "../../assets/icons/Upload.svg";
import {LOADING_TIME} from "../../constant";

function Album() {
  const {id} = useParams<{id: string}>();
  const {isOpen, toggle} = useModal();
  const [albumKey, setAlbumKey] = useState("");
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<{name: string; imageUrl: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIME);
  }, [id]);

  useEffect(() => {
    SelectAlbum();
    if (albumKey.length > 0)
      ReadPhotos(albumKey)
        .then(photoFiles => {
          const imageUrlArray = photoFiles.map(photo => photo.imageUrl);
          setAllFiles(imageUrlArray);
          setFiles(photoFiles);
          setTimeout(() => {
            setIsLoading(false);
          }, LOADING_TIME);
        })
        .catch(err => {
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
          <div title="삭제">
            <DeleteBtn
              type="button"
              id="AlbumDelete"
              className="Button"
              onClick={() => {
                toggle();
                ChangeModalFalse();
              }}
            />
          </div>
          <div title="업로드">
            <Upload
              type="button"
              id="AlbumUpload"
              className="Button"
              onClick={() => {
                toggle();
                ChangeModalTrue();
              }}
            />
          </div>
        </div>
      </div>
      <div id="AlbumContainer">
        {isLoading ? <Loading /> : <div> </div>}
        {files.map(file => (
          <AddPhotos
            key={file.imageUrl}
            file={file.imageUrl}
            name={file.name}
            deleteFiles={deleteFiles}
            setDeleteFiles={setDeleteFiles}
          />
        ))}
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
