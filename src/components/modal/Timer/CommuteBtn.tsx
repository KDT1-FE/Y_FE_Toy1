import React, { useState } from 'react';
import CommuteModal from './CommuteModal';
import { HeaderModalBtn, ModalBtnBox } from './style';
import { useRecoilState } from 'recoil';
import { UserId } from '../../../utils/recoil';

const CommuteBtn: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    };

    return (
        <ModalBtnBox
            onClick={() => {
                handleModal();
            }}
        >
            <HeaderModalBtn
                onClick={() => {
                    if (userId.length < 1) {
                        alert('로그인 후 사용이 가능합니다.');
                    }
                }}
            >
                Commute
            </HeaderModalBtn>
            {showModal && userId.length > 0 && <CommuteModal handleModal={handleModal} />}
        </ModalBtnBox>
    );
};

export default CommuteBtn;
