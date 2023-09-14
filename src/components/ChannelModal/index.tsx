import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createChannelDoc, updateChannelDoc } from '../../utils/firebase';

interface ChannelModalProps {
    isOpen: boolean;
    closeModal: () => void;
    collectionName: string;
    modalType: string;
    channelData: object;
    channelId: string;
}

const ChannelModal: React.FC<ChannelModalProps> = ({
    isOpen,
    closeModal,
    collectionName,
    modalType,
    channelData,
    channelId,
}) => {
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

    const handleUpdateChannel = async () => {
        try {
            await updateChannelDoc(collectionName, channelId, name);
            closeModal();
        } catch (error) {
            console.error('채널 수정 실패!', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{ display: 'flex' }}>
                <div>{modalType} a channel</div>
                <button onClick={closeModal}>X</button>
            </div>
            <div>채널 이름</div>
            <form>
                <input type="text" value={name} onChange={handleNameChange} />
            </form>
            <div>{name.length}</div>
            <div>채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운 이름을 사용하세요.</div>
            <button
                onClick={() => {
                    if (modalType === 'Create') {
                        handleCreateChannel();
                    } else if (modalType === 'Update') {
                        handleUpdateChannel();
                    }
                }}
            >
                완료
            </button>
        </Modal>
    );
};

export default ChannelModal;
