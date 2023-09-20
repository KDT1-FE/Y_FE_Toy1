import React from 'react';
import { ShowOn } from './style';
import { TimerOn } from '../../../utils/recoil';
import { useRecoilState } from 'recoil';
import { ShowTimerOn } from '../MyPage/commuteStyle';

const ShowState: React.FC = () => {
    const [timerOn, setTimerOn] = useRecoilState(TimerOn);
    return (
        <ShowTimerOn value={timerOn}>
            <span>ON</span>
        </ShowTimerOn>
    );
};

export default ShowState;
