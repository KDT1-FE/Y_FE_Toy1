import React, { useState } from 'react';
import { Modal, ModalWall, CloseBtn, ModalHeader, Utils, TimerModal } from './style';
import FastcampusDday from './FastcampusDday';
import ShowState from './ShowState';
import ShowCurrentTime from './ShowCurrentTime';
import Btns from './Btns';

interface OwnProps {
    handleModal(): void;
}

const CommuteModal: React.FC<OwnProps> = ({ handleModal }) => {
    // 1초마다 상태가 변하기 때문에 모달 안에서만 렌더링 되게 하기 위해서 useState 사용
    const [timeRenewal, setTimeRenewal] = useState<string | void>();

    return (
        <ModalWall
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <TimerModal>
                <ModalHeader>
                    <span>공부 기록</span>
                    <CloseBtn onClick={handleModal}>X</CloseBtn>
                </ModalHeader>
                <Utils>
                    <FastcampusDday timeRenewal={timeRenewal} />
                    <ShowState />
                </Utils>
                <ShowCurrentTime setTimeRenewal={setTimeRenewal} />
                <Btns />
            </TimerModal>
        </ModalWall>
    );
};

export default CommuteModal;
