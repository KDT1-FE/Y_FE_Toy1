import React, { useState } from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';
import Profile from './profile';
import Recruit from './recruit';
import Tech from './tech';

// clickedValue의 타입 정의
type ClickedValue = {
    userInfo?: string;
    articleR?: string;
    articleT?: string;
};

const Gallery: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<ClickedValue | null>(null);

    const handleKeyClick = (value: ClickedValue) => {
        setClickedValue(value);
        console.log(value);
    };

    return (
        <GalleryContainer id={'키값'}>
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
