import Sidebar from 'components/Sidebar'
import { useState } from "react"
import GalleryEdit from "./GalleryEdit"
import GalleryDetail from "./GalleryDetail"
import GalleryList from "./GalleryList"
import { Routes, Route } from "react-router-dom"
import styled from 'styled-components'

const Gallery = () => {
  
  const [onEdit, setOnEdit] = useState<boolean>(false);

  return (
  <>
    <Sidebar/>
    <Container>
      <Routes>
        <Route path="" element={<GalleryList />} />
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
