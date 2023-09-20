// SidebarWiki.tsx 파일 내에서
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { channelState, subChannelState } from '../../utils/recoil';
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
    ChannelDiv,
    SubChannelDiv,
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
    const [channel, setChannel] = useRecoilState(channelState);
    const [subChannel, setSubChannel] = useRecoilState(subChannelState);
    const defaultChannels = ['기본 정보'];
    const defaultSubChannels = ['과정 참여 규칙', '링크 모음'];
    useEffect(() => {
        if (!channel || !subChannel) {
            setChannel(defaultChannels[0]);
            setSubChannel(defaultSubChannels[0]);
        }
    }, [channel, subChannel, setChannel, setSubChannel]);

    const isSubChannelActive = (channelName: string, subChannelName: string) => {
        return channel === channelName && subChannel === subChannelName;
    };

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

        document.addEventListener('mousedown', (event) => {
            docsWithFields.forEach((_, index) => {
                handleClickOutside(event, index);
            });
        });

        return () => {
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
                {docsWithFields.map((item, index) => {
                    if (item.docId === defaultChannels[0]) {
                        return (
                            <ChannelWrapper key={index}>
                                <ChannelFlexDiv>
                                    <ChannelDiv># {item.docId}</ChannelDiv>
                                </ChannelFlexDiv>

                                <div style={{ marginLeft: '20px' }}>
                                    {item.docKeys.map((item2, index2) => (
                                        <SubChannelFlexDiv
                                            onClick={() => {
                                                handleKeyClick(item.docData[item2], item.docId, item2);
                                                setChannel(item.docId);
                                                setSubChannel(item2);
                                            }}
                                            style={{
                                                color: isSubChannelActive(item.docId, item2) ? '#ffffff' : '',
                                                backgroundColor: isSubChannelActive(item.docId, item2)
                                                    ? 'var(--active-item)'
                                                    : '',
                                                borderRadius: isSubChannelActive(item.docId, item2) ? '5px' : '',
                                                fontWeight: isSubChannelActive(item.docId, item2) ? 'bold' : '',
                                            }}
                                        >
                                            <SubChannelDiv key={index2}>{item2}</SubChannelDiv>
                                        </SubChannelFlexDiv>
                                    ))}
                                </div>
                                <ChannelHr />
                            </ChannelWrapper>
                        );
                    }
                    return null;
                })}

                {docsWithFields.map((item, index) => {
                    if (item.docId !== defaultChannels[0]) {
                        return (
                            <ChannelWrapper key={index}>
                                <ChannelFlexDiv>
                                    <ChannelDiv># {item.docId}</ChannelDiv>
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
                                            <OptionButton
                                                onClick={() => {
                                                    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');
                                                    if (shouldDelete) {
                                                        deleteChannelDoc('wiki', item.docId);
                                                    }
                                                }}
                                            >
                                                삭제
                                            </OptionButton>
                                        </DropDownOptions>
                                    )}
                                </ChannelFlexDiv>

                                <div style={{ marginLeft: '20px' }}>
                                    {item.docKeys.map((item2, index2) => (
                                        <SubChannelFlexDiv
                                            onClick={() => {
                                                handleKeyClick(item.docData[item2], item.docId, item2);
                                                setChannel(item.docId);
                                                setSubChannel(item2);
                                            }}
                                            style={{
                                                color: isSubChannelActive(item.docId, item2) ? '#ffffff' : '',
                                                backgroundColor: isSubChannelActive(item.docId, item2)
                                                    ? 'var(--active-item)'
                                                    : '',
                                                borderRadius: isSubChannelActive(item.docId, item2) ? '5px' : '',
                                                fontWeight: isSubChannelActive(item.docId, item2) ? 'bold' : '',
                                            }}
                                        >
                                            <SubChannelDiv key={index2}>{item2}</SubChannelDiv>
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
                                                    <OptionButton
                                                        onClick={() => {
                                                            const shouldDelete =
                                                                window.confirm('정말로 삭제하시겠습니까?');
                                                            if (shouldDelete) {
                                                                deleteFieldFromDoc('wiki', item.docId, item2);
                                                            }
                                                        }}
                                                    >
                                                        삭제
                                                    </OptionButton>
                                                </SubDropDownOptions>
                                            )}
                                        </SubChannelFlexDiv>
                                    ))}
                                </div>
                                <ChannelHr />
                            </ChannelWrapper>
                        );
                    }
                    return null;
                })}
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
