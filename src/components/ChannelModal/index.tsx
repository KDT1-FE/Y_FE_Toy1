import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createChannelDoc, updateChannelDoc, addFieldToDoc, updateFieldKeyInDoc } from '../../utils/firebase';
import { CloseButton, ModalTitle, CreateButton, FallbackButton, TextInput } from './style';

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
            borderRadius: '3%',
            width: '635px',
            height: '370px',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
    };
    const [name, setName] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (modalType === 'Create') {
                await createChannelDoc(collectionName, name);
            } else if (modalType === 'Update') {
                await updateChannelDoc(collectionName, channelId, name);
            } else if (modalType === 'CreateSub') {
                const fieldValue = { content: '', time: '' };
                await addFieldToDoc(collectionName, channelId, name, fieldValue);
            } else if (modalType === 'UpdateSub') {
                await updateFieldKeyInDoc(collectionName, channelId, subChannelId, name);
            }
            closeModal();
        } catch (error) {
            console.error('오류 발생:', error);
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

    useEffect(() => {
        if (modalType === 'Update' || modalType === 'UpdateSub') {
            setName(modalType === 'Update' ? channelId : subChannelId);
        } else {
            setName('');
        }
    }, [modalType, channelId, subChannelId]);

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <div style={{ display: 'flex' }}>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton onClick={closeModal}>X</CloseButton>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '20px 0 15px 0' }}>이름</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // 폼 제출의 기본 동작을 막습니다.
                    handleSubmit();
                }}
            >
                <TextInput placeholder={name} type="text" value={name} onChange={handleNameChange} />
            </form>
            <div>{80 - name.length}</div>
            <div>채널에서는 특정 주제에 대한 대화가 이루어집니다. 찾고 이해하기 쉬운 이름을 사용하세요.</div>
            <FallbackButton
                onClick={() => {
                    setName('');
                    closeModal();
                }}
            >
                취소
            </FallbackButton>
            <CreateButton onClick={handleSubmit}>저장</CreateButton>
        </Modal>
    );
};

export default ChannelModal;
