import React from 'react';
import { CloseBtn, Modal, ModalHeader } from '../Timer/style';
import { EditBox, EditInput, EditInputBox, InputLabel } from './style';

interface ownProps {
    handleEdit(): void;
}

const UserEdit: React.FC<ownProps> = ({ handleEdit }) => {
    return (
        <Modal>
            <ModalHeader>
                <span>입/퇴실 기록</span>
                <CloseBtn onClick={handleEdit}>X</CloseBtn>
            </ModalHeader>
            <EditBox>
                <input type="file" />
                <EditInputBox>
                    <InputLabel>
                        <label htmlFor="name">이름</label>
                        <EditInput id="name"></EditInput>
                    </InputLabel>
                    <InputLabel>
                        <label htmlFor="email">이메일</label>
                        <EditInput id="email"></EditInput>
                    </InputLabel>
                    <InputLabel>
                        <label htmlFor="info">자기소개</label>
                        <EditInput id="info"></EditInput>
                    </InputLabel>
                </EditInputBox>
            </EditBox>
        </Modal>
    );
};

export default UserEdit;
