import React from 'react';
import { ShowOn } from './style';
import { TimerOn } from '../../../utils/recoil';
import { useRecoilState } from 'recoil';

const ShowState: React.FC = () => {
    const [timerOn, setTimerOn] = useRecoilState(TimerOn);
    return (
        <ShowOn value={timerOn}>
            <span>ON</span>
        </ShowOn>
    );
};

export default ShowState;
