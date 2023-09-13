import React from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';

const Gallery: React.FC = () => {
    return (
        <GalleryContainer>
            <SidebarGallery />
            <div>갤러리 내용</div>
        </GalleryContainer>
    );
};

export default Gallery;
