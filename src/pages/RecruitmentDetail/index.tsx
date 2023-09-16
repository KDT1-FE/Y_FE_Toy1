import React, { useState } from 'react';
import { RecruitmentDetailContainer } from './style';
import SidebarGallery from '../../components/SidebarGallery';

const RecruitmentDetail: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null);

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };

    return (
        <RecruitmentDetailContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
