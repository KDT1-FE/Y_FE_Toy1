import GallerySidebar from 'components/GallerySiderbar'
import { useEffect, useState } from "react"
import GalleryEdit from "./GalleryEdit"
import GalleryDetail from "./GalleryDetail"
import GalleryList from "./GalleryList"
import { Routes, Route } from "react-router-dom"
import styled from 'styled-components'
import { db } from "../firebase"
import { collection, getDocs, query, where } from  "firebase/firestore"
import userData from './UserData'

const Gallery = () => {
  
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<userData[]>([]);
  const [activeCategory, setActiveCategory] = useState('notice'); // 초기값 설정
  // 초기값
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "gallery"));
      const galleryData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setGalleryData(galleryData);
    };

    fetchData();
  }, []);

  // 사이드바 쿼리구현
  const handleClick = async (category: string) => {
    const q = query(collection(db, "gallery"), where("category", "==", category));
    const data = await getDocs(q);
    setGalleryData(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    setActiveCategory(category)
  };

  return (
  <>
    <GallerySidebar handleClick={handleClick} activeCategory={activeCategory}/>
    <Container>
      <Routes>
        <Route path="" element={<GalleryList galleryData={galleryData} />} />
        <Route path="edit" element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />} />
        <Route path="edit/:id" element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />} />
        <Route path="detail/:id" element={<GalleryDetail onEdit={onEdit} setOnEdit={setOnEdit} setGalleryData={setGalleryData} />} />
      </Routes>
    </Container>
  </>
  )
}

const Container = styled.section`
  position: relative;
  left: 200px;
  height: calc(100% - 60px);
  width: calc(100% - 200px);
  padding: 5px;
  box-sizing: border-box;
`;

export default Gallery
