import React from 'react';
import { GalleryContainer } from './style';
import Profile from './profile';

const Gallery: React.FC = () => {
    return (
        <>
            <Profile />;<GalleryContainer>Gallery</GalleryContainer>;
        </>
    );
};

export default Gallery;
