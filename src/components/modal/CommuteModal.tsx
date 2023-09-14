import React, { useState } from 'react';
import { Modal, ModalWall, CloseBtn, ModalHeader, Utils } from './style';
import FastcampusDday from './FastcampusDday';
import ShowState from './ShowState';
import ShowCurrentTime from './ShowCurrentTime';
import Btns from './Btns';

interface OwnProps {
    handleModal(): void;
}

const CommuteModal: React.FC<OwnProps> = ({ handleModal }) => {
    const [timerOn, setTimerOn] = useState(false);
    const [timeRenewal, setTimeRenewal] = useState(['g', 1]);
    const timerHandler = () => {
        if (timerOn) {
            setTimerOn(false);
        } else {
            setTimerOn(true);
        }
    };

    return (
        <ModalWall>
            <Modal>
                <ModalHeader>
                    <span>공부 기록</span>
                    <CloseBtn onClick={handleModal}>X</CloseBtn>
                </ModalHeader>
                <Utils>
                    <FastcampusDday timeRenewal={timeRenewal} />
                    <ShowState value={timerOn} />
                </Utils>
                <ShowCurrentTime setTimeRenewal={setTimeRenewal} />
                <Btns timeHandler={timerHandler} />
            </Modal>
        </ModalWall>
    );
};

export default CommuteModal;
