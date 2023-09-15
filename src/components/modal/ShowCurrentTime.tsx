import React, { useEffect, useState } from 'react';
import { Now, Timebox } from './style';

interface OwnProps {
    setTimeRenewal: React.Dispatch<React.SetStateAction<(number | string)[]>>;
}

const ShowCurrentTime: React.FC<OwnProps> = ({ setTimeRenewal }) => {
    const [currentTime, setCurrentTime] = useState('');
    //모달창에 처음으로 들어갈 때 시간을 보여주기 위한 useEffect
    useEffect(() => {
        let Hours: number | string = new Date().getHours();
        let Min: number | string = new Date().getMinutes();
        let Sec: number | string = new Date().getSeconds();
        if (Hours < 10) {
            Hours = '0' + Hours;
        }
        if (Min < 10) {
            Min = '0' + Min;
        }
        if (Sec < 10) {
            Sec = '0' + Sec;
        }
        setTimeRenewal([Hours, Min, Sec]);
        setCurrentTime(`${Hours} : ${Min} : ${Sec}`);
    }, []);
    //시간을 실시간으로 갱신시켜주는 useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            let Hours: number | string = new Date().getHours();
            let Min: number | string = new Date().getMinutes();
            let Sec: number | string = new Date().getSeconds();
            if (Hours < 10) {
                Hours = '0' + Hours;
            }
            if (Min < 10) {
                Min = '0' + Min;
            }
            if (Sec < 10) {
                Sec = '0' + Sec;
            }

            setCurrentTime(`${Hours} : ${Min} : ${Sec}`);
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
