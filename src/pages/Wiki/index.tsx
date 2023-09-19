import React, { useState, useEffect } from 'react';
import { WikiContainer } from './style';
import SidebarWiki from '../../components/SidebarWiki';
const Wiki: React.FC = () => {
    const [clickedValue, setClickedValue] = useState<any>(null); // 클릭된 값의 상태를 유지합니다.
    // 클릭된 값을 처리하는 함수
    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };

    return (
        <WikiContainer>
            <SidebarWiki onKeyClick={handleKeyClick} /> {/* 클릭된 값의 핸들러 함수를 props로 전달합니다. */}
            {clickedValue && (
                <div>
                    <p>{JSON.stringify(clickedValue.value)}</p>
                    <p>채널: {clickedValue.channel}</p>
                    <p>서브채널: {clickedValue.subChannel}</p>
                </div>
            )}
        </WikiContainer>
    );
};

export default Wiki;
