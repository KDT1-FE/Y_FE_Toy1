// SidebarWiki.tsx 파일 내에서
import React, { useEffect, useState } from 'react';
import { ChannelSidebar, DropDownOptions, FlexDiv } from './style';

import { handleGetDocs, deleteChannelDoc, deleteFieldFromDoc, DocumentData } from '../../utils/firebase';
import { QuerySnapshot } from 'firebase/firestore';
import ChannelModal from '../ChannelModal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface SidebarWikiProps {
    onKeyClick: (value: any) => void; // 클릭된 값의 핸들러 함수를 props로 받습니다.
}

const SidebarWiki: React.FC<SidebarWikiProps> = ({ onKeyClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedSubChannelId, setSelectedSubChannelId] = useState('');
    const [selectedChannelId, setSelectedChannelId] = useState('');

    const [docsWithFields, setDocsWithFields] = useState<{ docId: string; docKeys: string[]; docData: DocumentData }[]>(
        [],
    );
    // 드롭다운 상태를 각 아이템마다 저장할 배열 추가
    const [dropdownStates, setDropdownStates] = useState<boolean[]>([]);
    const [dropdownSubStates, setDropdownSubStates] = useState<boolean[][]>([]);

    const toggleDropDown = (index: number) => {
        const updatedStates = [...dropdownStates];
        updatedStates[index] = !updatedStates[index];
        setDropdownStates(updatedStates);
    };

    const toggleDropDownSub = (docIndex: number, itemIndex: number) => {
        const updatedSubStates = [...dropdownSubStates];
        updatedSubStates[docIndex][itemIndex] = !updatedSubStates[docIndex][itemIndex];
        setDropdownSubStates(updatedSubStates);
    };

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
            // 초기 드롭다운 상태를 false로 초기화
            setDropdownStates(new Array(data.length).fill(false));
            const subDropdownStates = new Array(data.length).fill([]).map(() => new Array(data.length).fill(false));
            setDropdownSubStates(subDropdownStates);
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
                        <FlexDiv>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}># {item.docId}</div>
                            <MoreHorizIcon onClick={() => toggleDropDown(index)}></MoreHorizIcon>
                            {dropdownStates[index] && (
                                <DropDownOptions>
                                    <button
                                        onClick={() => {
                                            setModalType('CreateSub');
                                            setSelectedChannelId(item.docId);
                                            openModal();
                                        }}
                                    >
                                        추가
                                    </button>
                                    <button
                                        onClick={() => {
                                            setModalType('Update');
                                            // setSelectedSubChannelId(item.docData);
                                            setSelectedChannelId(item.docId);
                                            openModal();
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button onClick={() => deleteChannelDoc('wiki', item.docId)}>삭제</button>
                                </DropDownOptions>
                            )}
                        </FlexDiv>

                        <div>
                            {item.docKeys.map((item2, index2) => (
                                <FlexDiv>
                                    <div key={index2} onClick={() => handleKeyClick(item.docData[item2])}>
                                        &gt; {item2}
                                    </div>
                                    <MoreHorizIcon onClick={() => toggleDropDownSub(index, index2)}></MoreHorizIcon>
                                    {dropdownSubStates[index][index2] && (
                                        <DropDownOptions>
                                            <button
                                                onClick={() => {
                                                    setModalType('UpdateSub');
                                                    setSelectedSubChannelId(item2);
                                                    setSelectedChannelId(item.docId);
                                                    openModal();
                                                }}
                                            >
                                                수정
                                            </button>
                                            <button onClick={() => deleteFieldFromDoc('wiki', item.docId, item2)}>
                                                삭제
                                            </button>
                                        </DropDownOptions>
                                    )}
                                </FlexDiv>
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
                    subChannelId={selectedSubChannelId} // field 값
                    channelId={selectedChannelId} // doc 이름
                />
            )}
        </>
    );
};

export default SidebarWiki;
