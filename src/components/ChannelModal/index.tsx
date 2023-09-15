import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createChannelDoc, updateChannelDoc, addFieldToDoc, updateFieldKeyInDoc } from '../../utils/firebase';

interface ChannelModalProps {
    isOpen: boolean;
    closeModal: () => void;
    collectionName: string;
    modalType: string;
    subChannelId: string;
    channelId: string;
}

const ChannelModal: React.FC<ChannelModalProps> = ({
    isOpen,
    closeModal,
    collectionName,
    modalType,
    subChannelId,
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
            await updateChannelDoc(collectionName, channelId, name); //channelId라는 doc의 이름을 name으로 수정하는 것임
            closeModal();
        } catch (error) {
            console.error('채널 수정 실패!', error);
        }
    };

    const handleCreateSubChannel = async () => {
        const fieldValue = {}; // 수정은 wiki 페이지에서 하는 것이므로 우선 빈 객체 할당
        try {
            await addFieldToDoc(collectionName, channelId, name, fieldValue); // channelId라는 doc에 name:{fieldValue} 형태의 field를 추가하는 것임
            closeModal();
        } catch (error) {
            console.error('채널 수정 실패!', error);
        }
    };

    const handleUpdateSubChannel = async () => {
        try {
            await updateFieldKeyInDoc(collectionName, channelId, subChannelId, name); // channelId라는 doc의 field 키값 subChannelData를 name으로 수정
            closeModal();
        } catch (error) {
            console.error('서브채널 수정 실패!', error);
        }
    };

    const getTitleText = () => {
        switch (modalType) {
            case 'Create':
                return 'Create a channel';
            case 'Update':
                return 'Update a channel';
            case 'CreateSub':
                return 'Create a subchannel';
            case 'UpdateSub':
                return 'Update a subchannel';
            default:
                return '';
        }
    };
    const title = getTitleText();

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{ display: 'flex' }}>
                <div>{title}</div>
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
                    } else if (modalType === 'CreateSub') {
                        handleCreateSubChannel();
                    } else if (modalType === 'UpdateSub') {
                        handleUpdateSubChannel();
                    }
                }}
            >
                완료
            </button>
        </Modal>
    );
};

export default ChannelModal;
