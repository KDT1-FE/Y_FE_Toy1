import React, { useEffect, useState } from 'react';
import { Timebox } from './style';

interface OwnProps {
    setTimeRenewal: React.Dispatch<React.SetStateAction<string>>;
}

const ShowCurrentTime: React.FC<OwnProps> = ({ setTimeRenewal }) => {
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        const Hours = new Date().getHours();
        const Min = new Date().getMinutes();
        let Sec: number | string = new Date().getSeconds();
        if (Sec < 10) {
            Sec = '0' + Sec;
        }
        setTimeRenewal(`${Hours} : ${Min} : ${Sec}`);
        setCurrentTime(`${Hours} : ${Min} : ${Sec}`);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            const Hours = new Date().getHours();
            const Min = new Date().getMinutes();
            let Sec: number | string = new Date().getSeconds();
            if (Sec < 10) {
                Sec = '0' + Sec;
            }

            setCurrentTime(`${Hours} : ${Min} : ${Sec}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <Timebox>
            <span>{currentTime}</span>
        </Timebox>
    );
};

export default ShowCurrentTime;
