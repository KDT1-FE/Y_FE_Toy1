// SidebarWiki.tsx 파일 내에서
import React, { useEffect, useState } from 'react';
import { ChannelSidebar } from './style';

import { handleGetDocs, deleteChannelDoc, deleteFieldFromDoc, DocumentData } from '../../utils/firebase';
import { QuerySnapshot } from 'firebase/firestore';
import ChannelModal from '../ChannelModal';

interface SidebarWikiProps {
    onKeyClick: (value: any) => void; // 클릭된 값의 핸들러 함수를 props로 받습니다.
}

const SidebarWiki: React.FC<SidebarWikiProps> = ({ onKeyClick }) => {
    const [docsWithFields, setDocsWithFields] = useState<{ docId: string; docKeys: string[]; docData: DocumentData }[]>(
        [],
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedChannelData, setSelectedChannelData] = useState<DocumentData>({});
    const [selectedChannelId, setSelectedChannelId] = useState('');

    useEffect(() => {
        const updatedQuerySnapshot = handleGetDocs('wiki', (querySnapshot: QuerySnapshot<DocumentData>) => {
            const data: { docId: string; docKeys: string[]; docData: DocumentData }[] = [];

            querySnapshot.forEach((doc: any) => {
                const docData = doc.data();
                const docId = doc.id;
                const docKeys = Object.keys(docData);
                data.push({ docId, docKeys, docData });
            });

            setDocsWithFields(data);
        });

        return () => {
            updatedQuerySnapshot();
        };
    }, []);

    const handleKeyClick = (value: any) => {
        onKeyClick(value); // 클릭된 값을 상위 컴포넌트로 전달
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const collectionName = 'wiki';
    return (
        <>
            <ChannelSidebar>
                {docsWithFields.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}># {item.docId}</div>
                            <button
                                onClick={() => {
                                    setModalType('CreateSub');
                                    setSelectedChannelId(item.docId);
                                    openModal();
                                }}
                            >
                                추가
                            </button>
                            <button onClick={() => deleteChannelDoc('wiki', item.docId)}>삭제</button>
                            <button
                                onClick={() => {
                                    setModalType('Update');
                                    setSelectedChannelData(item.docData);
                                    setSelectedChannelId(item.docId);
                                    openModal();
                                }}
                            >
                                수정
                            </button>
                        </div>

                        <div>
                            {item.docKeys.map((item2, index2) => (
                                <div style={{ display: 'flex' }}>
                                    <div key={index2} onClick={() => handleKeyClick(item.docData[item2])}>
                                        &gt; {item2}
                                    </div>
                                    <button>수정</button>
                                    <button onClick={() => deleteFieldFromDoc('wiki', item.docId, item2)}>삭제</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div
                    style={{ fontSize: '20px', fontWeight: 'bold' }}
                    onClick={() => {
                        setModalType('Create');
                        openModal();
                    }}
                >
                    + 채널 추가
                </div>
            </ChannelSidebar>
            {isModalOpen && (
                <ChannelModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    collectionName={collectionName}
                    modalType={modalType}
                    channelData={selectedChannelData}
                    channelId={selectedChannelId}
                />
            )}
        </>
    );
};

export default SidebarWiki;
