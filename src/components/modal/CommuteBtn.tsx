import React, { useState } from 'react';
import CommuteModal from './CommuteModal';

const CommuteBtn: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    };
    return (
        <div>
            <div
                onClick={() => {
                    handleModal();
                }}
            >
                commute
            </div>
            {showModal && <CommuteModal handleModal={handleModal} />}
        </div>
    );
};

export default CommuteBtn;
