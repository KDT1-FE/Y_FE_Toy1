// SidebarWiki.tsx 파일 내에서
import React, { useEffect, useState, useRef } from 'react';
import {
    AllChannelsWrapper,
    ChannelWrapper,
    DropDownOptions,
    SubDropDownOptions,
    ChannelFlexDiv,
    SubChannelFlexDiv,
    MoreHorizIconWrapper,
    ChannelHr,
    CreateChannelDiv,
    OptionButton,
} from './style';

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

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownSubRef = useRef<HTMLDivElement | null>(null);

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
                docKeys.sort(); // 서브채널을 알파벳순으로 정렬
                data.push({ docId, docKeys, docData });
            });
            // 채널 목록을 알파벳순으로 정렬
            data.sort((a, b) => a.docId.localeCompare(b.docId));
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

    useEffect(() => {
        // document에 클릭 이벤트 리스너를 추가하여 DropDownOptions 요소 외부를 클릭했을 때 초기 드롭다운 상태를 false로 변경
        const handleClickOutside = (event: any, currentIndex: number) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // 클릭한 요소가 DropDownOptions 영역 외부에 있는 경우
                const updatedStates = [...dropdownStates];
                updatedStates[currentIndex] = false;
                setDropdownStates(updatedStates);
            }
            if (dropdownSubRef.current && !dropdownSubRef.current.contains(event.target)) {
                // 클릭한 요소가 SubDropDownOptions 영역 외부에 있는 경우
                const updatedSubStates = [...dropdownSubStates];
                updatedSubStates[currentIndex].fill(false);
                setDropdownSubStates(updatedSubStates);
            }
        };

        // 클릭 이벤트 리스너를 추가할 때 현재의 인덱스 값을 캡처하여 전달
        document.addEventListener('mousedown', (event) => {
            docsWithFields.forEach((_, index) => {
                handleClickOutside(event, index);
            });
        });

        return () => {
            // 클릭 이벤트 리스너를 정리
            document.removeEventListener('mousedown', (event) => {
                docsWithFields.forEach((_, index) => {
                    handleClickOutside(event, index);
                });
            });
        };
    }, [dropdownStates, dropdownSubStates, docsWithFields]);

    const handleKeyClick = (value: any, channel: string, subChannel: string) => {
        onKeyClick({ value, channel, subChannel }); // 클릭된 값을 상위 컴포넌트로 전달
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
            <AllChannelsWrapper>
                {docsWithFields.map((item, index) => (
                    <ChannelWrapper key={index}>
                        <ChannelFlexDiv>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}># {item.docId}</div>
                            <MoreHorizIconWrapper>
                                <MoreHorizIcon
                                    onClick={() => {
                                        toggleDropDown(index);
                                        console.log(dropdownStates);
                                    }}
                                ></MoreHorizIcon>
                            </MoreHorizIconWrapper>
                            {dropdownStates[index] && (
                                <DropDownOptions ref={dropdownRef}>
                                    <OptionButton
                                        onClick={() => {
                                            setModalType('CreateSub');
                                            setSelectedChannelId(item.docId);
                                            openModal();
                                        }}
                                    >
                                        추가
                                    </OptionButton>
                                    <OptionButton
                                        onClick={() => {
                                            setModalType('Update');
                                            // setSelectedSubChannelId(item.docData);
                                            setSelectedChannelId(item.docId);
                                            openModal();
                                        }}
                                    >
                                        수정
                                    </OptionButton>
                                    <OptionButton onClick={() => deleteChannelDoc('wiki', item.docId)}>
                                        삭제
                                    </OptionButton>
                                </DropDownOptions>
                            )}
                        </ChannelFlexDiv>

                        <div style={{ marginLeft: '20px' }}>
                            {item.docKeys.map((item2, index2) => (
                                <SubChannelFlexDiv
                                    onClick={() => handleKeyClick(item.docData[item2], item.docId, item2)}
                                >
                                    <div key={index2}>{item2}</div>
                                    <MoreHorizIconWrapper>
                                        <MoreHorizIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDropDownSub(index, index2);
                                            }}
                                        ></MoreHorizIcon>
                                    </MoreHorizIconWrapper>
                                    {dropdownSubStates[index][index2] && (
                                        <SubDropDownOptions ref={dropdownSubRef}>
                                            <OptionButton
                                                onClick={() => {
                                                    setModalType('UpdateSub');
                                                    setSelectedSubChannelId(item2);
                                                    setSelectedChannelId(item.docId);
                                                    openModal();
                                                }}
                                            >
                                                수정
                                            </OptionButton>
                                            <OptionButton onClick={() => deleteFieldFromDoc('wiki', item.docId, item2)}>
                                                삭제
                                            </OptionButton>
                                        </SubDropDownOptions>
                                    )}
                                </SubChannelFlexDiv>
                            ))}
                        </div>
                        <ChannelHr />
                    </ChannelWrapper>
                ))}
                <CreateChannelDiv
                    onClick={() => {
                        setModalType('Create');
                        openModal();
                    }}
                >
                    + 채널 추가
                </CreateChannelDiv>
            </AllChannelsWrapper>
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
