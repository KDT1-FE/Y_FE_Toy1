import React, { useEffect, useState } from 'react';
import { Now, Timebox } from './style';
import { CreateTime } from '../Hooks/WhatTime';
import { TimeNow, TimeNowbox } from '../MyPage/commuteStyle';

interface OwnProps {
    setTimeRenewal: React.Dispatch<React.SetStateAction<string | void>>;
}

const ShowCurrentTime: React.FC<OwnProps> = ({ setTimeRenewal }) => {
    const [currentTime, setCurrentTime] = useState('');
    const timeSet = () => {
        const time = CreateTime();
        setCurrentTime(time);
        return time;
    };
    //모달창에 처음으로 들어갈 때 시간을 보여주기 위한 useEffect
    useEffect(() => {
        timeSet();
    }, []);
    //시간을 실시간으로 갱신시켜주는 useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRenewal(timeSet());
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <TimeNowbox>
            <p>현재 시간</p>
            <TimeNow>{currentTime}</TimeNow>
        </TimeNowbox>
    );
};

export default ShowCurrentTime;
