import React, { useState } from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';

const Gallery: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null); // 클릭된 값의 상태를 유지합니다.

    // 클릭된 값을 처리하는 함수
    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };
    return (
        <GalleryContainer>
            <SidebarGallery onKeyClick={handleKeyClick} /> {/* 클릭된 값의 핸들러 함수를 props로 전달합니다. */}
            {clickedValue && <div>{JSON.stringify(clickedValue)}</div>}
        </GalleryContainer>
    );
};

export default Gallery;
