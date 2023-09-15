import React, { useState } from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';

interface OwnProps {
    timeHandler(): void;
}
const Btns: React.FC<OwnProps> = ({ timeHandler }) => {
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const timerSwitch = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const today = year + '.' + month + '.' + day;
        let Hours: number | string = date.getHours();
        let Minutes: number | string = date.getMinutes();
        if (Hours < 10) {
            Hours = '0' + Hours;
        }
        if (Minutes < 10) {
            Minutes = '0' + Minutes;
        }
        if (!timerOn) {
            console.log(today);
            console.log('입실: ' + Hours + ':' + Minutes);
            setTimerOn(true);
        } else {
            console.log('퇴실: ' + Hours + ':' + Minutes);
            setTimerOn(false);
        }
        timeHandler();
    };
    return (
        <BtnBox>
            <OnBtn
                value={timerOn}
                onClick={() => {
                    if (!timerOn) {
                        timerSwitch();
                    }
                }}
            >
                입실
            </OnBtn>
            <OffBtn
                value={timerOn}
                onClick={() => {
                    if (timerOn) {
                        timerSwitch();
                    }
                }}
            >
                퇴실
            </OffBtn>
        </BtnBox>
    );
};

export default Btns;
