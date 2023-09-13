import Sidebar from 'components/Sidebar'
import React from "react"
import GalleryEdit from "./GalleryEdit"
import GalleryDetail from "./GalleryDetail"
import GalleryList from "./GalleryList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Gallery = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryList />} />
        <Route path="/edit" element={<GalleryEdit />} />
        <Route path="/detail/:id" element={<GalleryDetail />} />
      </Routes>
    </Router>
  )
}

export default Gallery