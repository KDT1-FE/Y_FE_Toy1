import React, { useState } from 'react';
import { GalleryContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';
import Profile from './profile';
import Recruit from './recruit';

const Gallery: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null);

    const handleKeyClick = (value: any) => {
        console.log(value);
        setClickedValue(value);
        console.log(value);
    };
    return (
        <GalleryContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
            {/* {clickedValue && <Profile />} */}
            {clickedValue.userInfo ? <Profile /> : clickedValue.articleR ? <Recruit /> : <div>Tech</div>};
        </GalleryContainer>
    );
};

export default Gallery;
