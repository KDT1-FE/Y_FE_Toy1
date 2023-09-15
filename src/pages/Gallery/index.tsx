import React, { useState } from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';
import Profile from './profile';
import Recruit from './recruit';

const Gallery: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null);

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };
    return (
        <GalleryContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
            {clickedValue && clickedValue.userInfo ? (
                <Profile />
            ) : clickedValue && clickedValue.articleR ? (
                <Recruit />
            ) : clickedValue && clickedValue.articleT ? (
                <div>Tech</div>
            ) : (
                <div>채널을 선택해주세요.</div>
            )}
            ;
        </GalleryContainer>
    );
};

export default Gallery;
