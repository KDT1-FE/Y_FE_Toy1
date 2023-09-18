import React, { useState } from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';
import Profile from './profile';
import Recruit from './recruit';
import Tech from './tech';

const Gallery: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null);

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
        console.log(value);
    };
    return (
        <GalleryContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
            {clickedValue && clickedValue.userInfo ? (
                <Profile />
            ) : clickedValue && clickedValue.articleR ? (
                <Recruit />
            ) : clickedValue && clickedValue.articleT ? (
                <Tech />
            ) : (
                <Recruit />
            )}
        </GalleryContainer>
    );
};

export default Gallery;
