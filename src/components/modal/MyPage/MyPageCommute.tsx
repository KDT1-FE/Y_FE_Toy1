import React from 'react';
import ShowState from '../Timer/ShowState';
import ShowCurrentTime from '../Timer/ShowCurrentTime';
import Btns from '../Timer/Btns';
import { CommuteModalBox } from './commuteStyle';

interface OwnProps {
    setTimeRenewal: React.Dispatch<React.SetStateAction<string | void>>;
}

const MyPageCommute: React.FC<OwnProps> = ({ setTimeRenewal }) => {
    return (
        <CommuteModalBox>
            <ShowCurrentTime setTimeRenewal={setTimeRenewal} />
            <Btns />
        </CommuteModalBox>
    );
};

export default MyPageCommute;
