import React, { useEffect, useState } from 'react';
import { CloseBtn, Modal, ModalHeader } from '../Timer/style';
import { TimelogBox, TimelogBoxScroll, TimelogEl } from './style';
import { useRecoilState } from 'recoil';
import { UserId } from '../../../utils/recoil';
import { readTimelog } from '../../../utils/firebase';

interface OwnProps {
    handleTimelog(): void;
}

const TimelogModal: React.FC<OwnProps> = ({ handleTimelog }) => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [timelogData, setTimelogData] = useState([]);
    useEffect(() => {
        async function getTimelog() {
            const timelogData = await readTimelog('user', userId);
            if (timelogData) {
                setTimelogData(timelogData);
            }
        }
        getTimelog();
    }, []);

    return (
        <Modal>
            <ModalHeader>
                <span>입/퇴실 기록</span>
                <CloseBtn onClick={handleTimelog}>X</CloseBtn>
            </ModalHeader>
            <TimelogBox>
                <TimelogBoxScroll>
                    {timelogData.map((e: string, i) => (
                        <TimelogEl key={i}>
                            <div>{e}</div>
                        </TimelogEl>
                    ))}
                </TimelogBoxScroll>
            </TimelogBox>
        </Modal>
    );
};

export default TimelogModal;
