import React, { useEffect, useState } from 'react';
import CommuteModal from './CommuteModal';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

const CommuteBtn: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    };

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const cu = auth.currentUser;
                console.log(user.email);
                console.log(cu);
            } else {
                alert('로그인 해라');
            }
        });
    }, []);

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
