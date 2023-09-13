import React, { useEffect, useState } from 'react';
import { Dday } from './style';
import Logo from '../../common/fastcampusIcon.png';

interface OwnProps {
    timeRenewal: string;
}

const FastcampusDday: React.FC<OwnProps> = ({ timeRenewal }) => {
    const cDay: Date = new Date('2024-01-30');
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    const [dDay, setDday] = useState(Math.floor((cDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const dDayCurrent = () => {
        setDday(Math.floor((cDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    };
    useEffect(() => {
        dDayCurrent();
    }, [{ timeRenewal }]);
    return (
        <Dday>
            <img src={Logo} alt="패스트캠퍼스 아이콘" />
            <span>D - {dDay}</span>
        </Dday>
    );
};
export default FastcampusDday;
