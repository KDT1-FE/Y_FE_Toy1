import React, { useState } from 'react';
import { OnBtn, OffBtn, BtnBox } from './style';

interface OwnProps {
    timeHandler(): void;
}
const Btns: React.FC<OwnProps> = ({ timeHandler }) => {
    const [timerOn, setTimerOn] = useState<boolean>(false);
    const timerSwitch = () => {
        if (!timerOn) {
            setTimerOn(true);
        } else {
            setTimerOn(false);
        }
        timeHandler();
    };
    return (
        <BtnBox>
            <OnBtn value={timerOn} onClick={timerSwitch}>
                입실
            </OnBtn>
            <OffBtn value={timerOn} onClick={timerSwitch}>
                퇴실
            </OffBtn>
        </BtnBox>
    );
};

export default Btns;
