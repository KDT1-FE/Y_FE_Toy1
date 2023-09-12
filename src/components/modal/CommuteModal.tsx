import React from 'react';
import { Modal, ModalWall, CloseBtn, ModalHeader, Utils } from './style';
import FastcampusDday from './FastcampusDday';
import ShowState from './ShowState';
import ShowCurrentTime from './ShowCurrentTime';
import Btns from './Btns';

interface OwnProps {
    handleModal(): void;
}

const CommuteModal: React.FC<OwnProps> = ({ handleModal }) => {
    return (
        <ModalWall>
            <Modal>
                <ModalHeader>
                    <span>공부 기록</span>
                    <CloseBtn
                        onClick={() => {
                            handleModal();
                        }}
                    >
                        X
                    </CloseBtn>
                </ModalHeader>
                <Utils>
                    <FastcampusDday />
                    <ShowState />
                </Utils>
                <ShowCurrentTime />
                <Btns />
            </Modal>
        </ModalWall>
    );
};

export default CommuteModal;
