import React from 'react';
import { FlexBox, FlexBoxColumn, MarginLeft, MyPageContents, RedCircle } from './style';
import { useRecoilState } from 'recoil';
import { TimerOn } from '../../../utils/recoil';
import TimerIcon from '@mui/icons-material/Timer';
import BookIcon from '@mui/icons-material/Book';

interface OwnProps {
    handleTimerModal(): void;
    handleReadModal(): void;
}

const MyPageTimelog: React.FC<OwnProps> = ({ handleTimerModal, handleReadModal }) => {
    const [timerOn, setTimerOn] = useRecoilState(TimerOn);

    return (
        <MyPageContents>
            <FlexBox>
                <FlexBoxColumn>
                    <MarginLeft>Commute</MarginLeft>
                </FlexBoxColumn>
                <RedCircle value={timerOn}>·</RedCircle>
            </FlexBox>
            <FlexBox>
                <TimerIcon onClick={handleTimerModal} style={{ cursor: 'pointer' }}></TimerIcon>
                <BookIcon onClick={handleReadModal} style={{ cursor: 'pointer' }}></BookIcon>
            </FlexBox>
        </MyPageContents>
    );
};

export default MyPageTimelog;
