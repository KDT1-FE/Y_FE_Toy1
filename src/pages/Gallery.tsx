import GallerySidebar from 'components/GallerySiderbar'
import { useEffect, useState } from "react"
import GalleryEdit from "./GalleryEdit"
import GalleryDetail from "./GalleryDetail"
import GalleryList from "./GalleryList"
import { Routes, Route } from "react-router-dom"
import styled from 'styled-components'
import { db } from "../firebase"
import { collection, getDocs, query, where } from  "firebase/firestore"

interface userData {
  id?: string,
  category?: string,
  title?: string,
  date?: string,
  timestamp?: string,
  writer?: string,
  desc?: string,
  thumbnail?: string,
  uid?: string
}


const Gallery = () => {
  
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<userData[]>([]);

  // 사이드바 쿼리구현
    const handleClick = async (category: string) => {
      const q = query(collection(db, "gallery"), where("category", "==", category));
      const data = await getDocs(q);
      setGalleryData(data.docs.map((doc) => ({
        id: doc.id,
        category: doc.data().category,
        title: doc.data().title,
        date: doc.data().date,
        timestamp: doc.data().timestamp,
        writer: doc.data().writer,
        desc: doc.data().desc,
        thumbnail: doc.data().thumbnail,
        uid: doc.data().uid
      })));
    };

    // 초기값
    useEffect(() => {
      const fetchData = async () => {
        const data = await getDocs(collection(db, "gallery"));
        const galleryData = data.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          title: doc.data().title,
          date: doc.data().date,
          timestamp: doc.data().timestamp,
          writer: doc.data().writer,
          desc: doc.data().desc,
          thumbnail: doc.data().thumbnail,
          uid: doc.data().uid
        }));
        setGalleryData(galleryData);
      };
  
      fetchData();
    }, []);

  return (
  <>
    <GallerySidebar handleClick={handleClick}/>
    <Container>
      <Routes>
        <Route path="" element={<GalleryList galleryData={galleryData} />} />
        <Route path="edit" element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit}/>} />
        <Route path="edit/:id" element={<GalleryEdit onEdit={onEdit} setOnEdit={setOnEdit} />} />
        <Route path="detail/:id" element={<GalleryDetail onEdit={onEdit} setOnEdit={setOnEdit} />} />
      </Routes>
    </Container>
  </>
  )
}

const Container = styled.section`
  position: relative;
  left: 180px;
  height: calc(100% - 60px);
  width: calc(100% - 180px);
  padding: 5px;
  box-sizing: border-box;
`;

export default Gallery
