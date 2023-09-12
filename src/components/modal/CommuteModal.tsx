import React from 'react';
import { Modal, ModalWall, CloseBtn, ModalHeader } from './style';

interface OwnProps {
    handleModal(): void;
}

const CommuteModal: React.FC<OwnProps> = ({ handleModal }) => {
    return (
        <ModalWall>
            <Modal>
                <ModalHeader></ModalHeader>
                <CloseBtn
                    onClick={() => {
                        handleModal();
                    }}
                >
                    X
                </CloseBtn>
            </Modal>
        </ModalWall>
    );
};

export default CommuteModal;
