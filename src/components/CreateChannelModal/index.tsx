import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createChannelDoc } from '../../utils/firebase';

interface CreateChannelModalProps {
    isOpen: boolean;
    closeModal: () => void;
    collectionName: string;
}

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ isOpen, closeModal, collectionName }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(45, 45, 45, 0.4)',
        },
    };
    const [name, setName] = useState('');

    // 이름 입력 값이 변경될 때마다 name 상태 업데이트
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCreateChannel = async () => {
        try {
            await createChannelDoc(collectionName, name);

            closeModal();
        } catch (error) {
            console.error('채널 생성 실패!', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{ display: 'flex' }}>
                <div>Create a channel</div>
                <button onClick={closeModal}>X</button>
            </div>
            <div>채널 이름</div>
            <form>
                <input type="text" value={name} onChange={handleNameChange} />
            </form>
            <div>{name.length}</div>
            <div>채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운 이름을 사용하세요.</div>
            <button onClick={handleCreateChannel}>생성</button>
        </Modal>
    );
};

export default CreateChannelModal;
