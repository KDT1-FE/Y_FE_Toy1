import * as style from "./galleryStyle";
import { useState, useEffect } from "react";
import GalleryHeader from "@components/gallery/GalleryHeader";
import GallerySide from "@components/gallery/GallerySide";
import GalleryMain from "@components/gallery/GalleryMain";
import Addlist from "@components/gallery/AddList";
import CurrentImg from "@/components/gallery/CurrentImg";
import { AddImg } from "@/components/gallery/AddImg";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { app } from "../../../firebase";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  FullMetadata,
} from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

interface Folders {
  createdAt: Date;
  id: string;
  sub: string[];
  title: string;
}

interface ImageInfo {
  url: string;
  metadata: FullMetadata;
}

export default function Gallery() {
  const [addListModal, setAddListModal] = useState(false);
  const [configList, setConfigList] = useState(false);
  const [galleryData, setGalleryData] = useState<Folders[]>([]);
  const [album, setAlbum] = useState("개발팀");
  const [albumId, setAlbumId] = useState("0jL7NLzNrPzOuqeuJSk2");
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [curImg, setCurImg] = useState<string>("");
  const [viewImg, setViewImg] = useState<boolean>(false);
  const [imgLoad, setImgLoad] = useState(true);
  const [addImg, setAddImg] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [albumId]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesRef = ref(storage, `Gallery/${albumId}`);
      const imageList = await listAll(imagesRef);

      const paths = imageList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);

        return { url, metadata };
      });

      const imageInfoList: ImageInfo[] = await Promise.all(paths);
      const sortedImages = imageInfoList.sort((a, b) => {
        if (a.metadata.customMetadata) {
        }
        const timestampA = a.metadata.customMetadata!.timestamp;
        const timestampB = b.metadata.customMetadata!.timestamp;
        return new Date(timestampA).getTime() - new Date(timestampB).getTime();
      });

      const urls = sortedImages.map((item) => item.url);
      setImagePaths(urls);
      setImgLoad(false);
    } catch (error) {
      console.error("이미지 목록을 가져오는 중 오류 발생:", error);
    }
  };

  const fetchData = async () => {
    const galleryRef = collection(firestore, "Gallery");
    const querySnapshot = await getDocs(galleryRef);

    const galleryArray: Folders[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      galleryArray.push({
        createdAt: (data.createdAt as Timestamp).toDate(),
        id: data.id,
        sub: data.sub,
        title: data.title,
      });
    });

    galleryArray.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    setGalleryData(galleryArray);
  };

  const openAddListModal = (): void => {
    setAddListModal(true);
  };

  const closeAddListModal = (): void => {
    setAddListModal(false);
  };
  return (
    <style.Gallery>
      <GalleryHeader />
      <style.MainWrap>
        <GallerySide
          openAddListModal={openAddListModal}
          galleryData={galleryData}
          addListModal={addListModal}
          configList={configList}
          setConfigList={setConfigList}
          setGalleryData={setGalleryData}
          setAlbum={setAlbum}
          album={album}
          setAlbumId={setAlbumId}
          setImgLoad={setImgLoad}
        />
        <GalleryMain
          album={album}
          imagePaths={imagePaths}
          viewImg={viewImg}
          imgLoad={imgLoad}
          setViewImg={setViewImg}
          setCurImg={setCurImg}
          setAddImg={setAddImg}
          setImgLoad={setImgLoad}
        />
      </style.MainWrap>
      {addListModal ? (
        <Addlist
          closeAddListModal={closeAddListModal}
          galleryData={galleryData}
          setGalleryData={setGalleryData}
        />
      ) : null}
      {viewImg ? (
        <CurrentImg
          curImg={curImg}
          imagePaths={imagePaths}
          setCurImg={setCurImg}
          setViewImg={setViewImg}
          setImagePaths={setImagePaths}
        ></CurrentImg>
      ) : null}
      {addImg ? (
        <AddImg
          setAddImg={setAddImg}
          setImgLoad={setImgLoad}
          setImagePaths={setImagePaths}
          albumId={albumId}
          imagePaths={imagePaths}
        ></AddImg>
      ) : null}
    </style.Gallery>
  );
}
