import React, { useEffect, useState } from 'react';
import { Now, Timebox } from './style';

interface OwnProps {
    setTimeRenewal: React.Dispatch<React.SetStateAction<string | void>>;
}

const ShowCurrentTime: React.FC<OwnProps> = ({ setTimeRenewal }) => {
    const [currentTime, setCurrentTime] = useState('');
    const timeSet = (set = 0) => {
        let Hours: number | string = new Date().getHours();
        let Min: number | string = new Date().getMinutes();
        let Sec: number | string = new Date().getSeconds();
        Hours = String(Hours).padStart(2, '0');
        Min = String(Min).padStart(2, '0');
        Sec = String(Sec).padStart(2, '0');
        const time = `${Hours} : ${Min} : ${Sec}`;
        if (set) {
            return time;
        }
        setCurrentTime(time);
    };
    //모달창에 처음으로 들어갈 때 시간을 보여주기 위한 useEffect
    useEffect(() => {
        timeSet();
    }, []);
    //시간을 실시간으로 갱신시켜주는 useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRenewal(timeSet(1));
            timeSet();
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <Timebox>
            <p>현재 시간</p>
            <Now>{currentTime}</Now>
        </Timebox>
    );
};

export default ShowCurrentTime;
