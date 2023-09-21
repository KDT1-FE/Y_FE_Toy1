import GallerySidebar from "components/template/GallerySiderbar";
import { useEffect, useState } from "react";
import GalleryEdit from "./GalleryEdit";
import GalleryDetail from "./GalleryDetail";
import GalleryList from "./GalleryList";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import userData from "./UserData";
import { IsMobile } from "utils/mediaQuery";

const Gallery = () => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<userData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("notice"); // 초기값 설정

  let leftMargin = 200
  let topMargin = 60
  
  if(IsMobile()){
    leftMargin = 0
    topMargin = 100
  }

  // 초기값
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "gallery"));
      const galleryData: userData[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      galleryData.sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return b.timestamp.toMillis() - a.timestamp.toMillis();
        }
        return 0;
      });
      setGalleryData(galleryData);
    };

    fetchData();
  }, []);

  // 사이드바 쿼리구현
  const handleClick = async (category: string) => {
    const q = query(collection(db, "gallery"), where("category", "==", category));
    const data = await getDocs(q);
    const galleryData: userData[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    galleryData.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return b.timestamp.toMillis() - a.timestamp.toMillis();
      }
      return 0;
    });
    setGalleryData(galleryData);
    setActiveCategory(category);
  };

  return (
    <>
      <GallerySidebar handleClick={handleClick} activeCategory={activeCategory} />
      <Container leftMargin={leftMargin} topMargin={topMargin}>
        <Routes>
          <Route path="" element={<GalleryList galleryData={galleryData} activeCategory={activeCategory} />} />
          <Route
            path="edit"
            element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />}
          />
          <Route
            path="edit/:id"
            element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />}
          />
          <Route
            path="detail/:id"
            element={<GalleryDetail onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />}
          />
        </Routes>
      </Container>
    </>
  );
};

const Container = styled.section<IContainer>`
  position: relative;
  left: ${props=>props.leftMargin}px;
  height: calc(100% - ${props=>props.topMargin}px);
  width: calc(100% - ${props=>props.leftMargin}px);
  padding: 5px;
  box-sizing: border-box;
  img {
    max-width: 100%;
  }
`;

interface IContainer {
  leftMargin : number;
  topMargin : number;
}

export default Gallery;
