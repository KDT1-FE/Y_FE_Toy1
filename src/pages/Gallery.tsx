import Sidebar from 'components/Sidebar'
import React from "react"
import GalleryEdit from "./GalleryEdit"
import GalleryDetail from "./GalleryDetail"
import GalleryList from "./GalleryList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Gallery = () => {
  
  return (
  <>
   <Sidebar />
   <Container>
    <Router>
      <Routes>
        <Route path="/" element={<GalleryList />} />
        <Route path="/edit" element={<GalleryEdit />} />
        <Route path="/detail/:id" element={<GalleryDetail />} />
      </Routes>
    </Router>
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
