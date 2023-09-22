import React from 'react';
import { FlexBox, FlexBoxColumn, MarginLeft, MyPageContents, RedCircle } from './style';
import { useRecoilState } from 'recoil';
import { TimerOn } from '../../../utils/recoil';
import TimerIcon from '@mui/icons-material/Timer';
import BookIcon from '@mui/icons-material/Book';
import { ChangeTimelog, ChangeTimer } from './commuteStyle';

interface OwnProps {
    handleTimerModal(number: number): void;
    handleReadModal(number: number): void;
    showModal: boolean;
}

const MyPageTimelog: React.FC<OwnProps> = ({ handleTimerModal, handleReadModal, showModal }) => {
    const [timerOn, setTimerOn] = useRecoilState(TimerOn);

    return (
        <MyPageContents>
            <FlexBox>
                <FlexBoxColumn>
                    <MarginLeft>Commute</MarginLeft>
                </FlexBoxColumn>
                <RedCircle value={timerOn}></RedCircle>
            </FlexBox>
            <FlexBox>
                <ChangeTimer value={showModal}>
                    <TimerIcon
                        onClick={() => {
                            handleTimerModal(1);
                        }}
                        style={{ cursor: 'pointer' }}
                    ></TimerIcon>
                </ChangeTimer>
                <ChangeTimelog value={showModal}>
                    <BookIcon
                        onClick={() => {
                            handleReadModal(0);
                        }}
                        style={{ cursor: 'pointer' }}
                    ></BookIcon>
                </ChangeTimelog>
            </FlexBox>
        </MyPageContents>
    );
};

export default MyPageTimelog;
