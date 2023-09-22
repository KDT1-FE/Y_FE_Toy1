import React, { useEffect, useState } from 'react';
import { Dday } from './style';
import Logo from '../../../common/fastcampusIcon-removebg-preview.png';

interface OwnProps {
    timeRenewal: string | void;
}

const FastcampusDday: React.FC<OwnProps> = ({ timeRenewal }) => {
    const [dDay, setDday] = useState(0);
    const dDaySet = () => {
        const cDay: Date = new Date('2024-01-30');
        const today: Date = new Date();
        today.setHours(0, 0, 0, 0);
        setDday(Math.floor((cDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    };

    //모달창에 처음으로 들어갈 때 디데이를 보여주기 위한 useEffect
    useEffect(() => {
        dDaySet();
    }, []);
    //디데이를 실시간으로 갱신시켜주는 useEffect
    useEffect(() => {
        dDaySet();
    }, [{ timeRenewal }]);
    return (
        <Dday>
            <img src={Logo} alt="패스트캠퍼스 아이콘" />
            <span>D - {dDay}</span>
        </Dday>
    );
};
export default FastcampusDday;
