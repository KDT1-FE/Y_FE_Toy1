import GallerySidebar from "components/template/GallerySiderbar";
import { useEffect, useState } from "react";
import GalleryEdit from "./GalleryEdit";
import GalleryDetail from "./GalleryDetail";
import GalleryList from "./GalleryList";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import userData from "./UserData";

const Gallery = () => {
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<userData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("notice"); // 초기값 설정
  // 초기값
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "gallery"),
        orderBy("timestamp", "desc")
      );
      const data = await getDocs(q);
      const galleryData: userData[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setGalleryData(galleryData);
    };

    fetchData();
  }, []);

  // 사이드바 쿼리구현
  const handleClick = async (category: string) => {
    const q = query(collection(db, "gallery"), where("category", "==", category));
    const data = await getDocs(q);
    const galleryData: userData[] = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setGalleryData(galleryData);
    setActiveCategory(category);
  };

  return (
    <>
      <GallerySidebar handleClick={handleClick} activeCategory={activeCategory} />
      <Container>
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

const Container = styled.section`
  position: relative;
  left: 200px;
  height: calc(100% - 60px);
  width: calc(100% - 200px);
  padding: 5px;
  box-sizing: border-box;
  img {
    max-width: 100%;
  }
`;

export default Gallery;
