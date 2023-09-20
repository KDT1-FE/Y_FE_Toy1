import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { channelState, subChannelState } from '../../utils/recoil';
import {
    AllChannelsWrapper,
    ChannelWrapper,
    ChannelFlexDiv,
    SubChannelFlexDiv,
    ChannelHr,
    ChannelDiv,
    SubChannelDiv,
} from './style';

import { handleGetDocs } from '../../utils/firebase';
import { QuerySnapshot } from 'firebase/firestore';

interface DocumentData {
    [key: string]: any;
}

interface SidebarGalleryProps {
    onKeyClick: (value: any) => void; // 클릭된 값의 핸들러 함수를 props로 받습니다.
}

const SidebarGallery: React.FC<SidebarGalleryProps> = ({ onKeyClick }) => {
    const [docsWithFields, setDocsWithFields] = useState<{ docId: string; docKeys: string[]; docData: DocumentData }[]>(
        [],
    );
    const [channel, setChannel] = useRecoilState(channelState);
    const [subChannel, setSubChannel] = useRecoilState(subChannelState);
    const defaultChannel = '레퍼런스 공유';
    const defaultSubChannel = '취업';

    useEffect(() => {
        if (!channel || !subChannel) {
            setChannel(defaultChannel);
            setSubChannel(defaultSubChannel);
        }
    }, [channel, subChannel, setChannel, setSubChannel]);

    const isSubChannelActive = (channelName: string, subChannelName: string) => {
        return channel === channelName && subChannel === subChannelName;
    };

    useEffect(() => {
        const updatedQuerySnapshot = handleGetDocs('gallery', (querySnapshot: QuerySnapshot<DocumentData>) => {
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
        });

        return () => {
            updatedQuerySnapshot();
        };
    }, []);

    const handleKeyClick = (value: any) => {
        onKeyClick(value); // 클릭된 값을 상위 컴포넌트로 전달합니다.
    };

    return (
        <AllChannelsWrapper>
            {docsWithFields.map((item, index) => (
                <ChannelWrapper key={index}>
                    <ChannelFlexDiv>
                        <ChannelDiv># {item.docId}</ChannelDiv>
                    </ChannelFlexDiv>

                    <div style={{ marginLeft: '20px' }}>
                        {item.docKeys.map((item2, index2) => (
                            <SubChannelFlexDiv
                                onClick={() => {
                                    handleKeyClick(item.docData[item2]);
                                    setChannel(item.docId);
                                    setSubChannel(item2);
                                }}
                                style={{
                                    color: isSubChannelActive(item.docId, item2)
                                        ? '${(props) => props.theme.text}'
                                        : '',
                                    backgroundColor: isSubChannelActive(item.docId, item2)
                                        ? '${(props) => props.theme.activeColor1}'
                                        : '',
                                    borderRadius: isSubChannelActive(item.docId, item2) ? '5px' : '',
                                    marginRight: isSubChannelActive(item.docId, item2) ? '10px' : '',
                                    fontWeight: isSubChannelActive(item.docId, item2) ? 'bold' : '',
                                }}
                            >
                                <SubChannelDiv key={index2}>{item2}</SubChannelDiv>
                            </SubChannelFlexDiv>
                        ))}
                    </div>
                    {index === 0 && <ChannelHr />}
                </ChannelWrapper>
            ))}
        </AllChannelsWrapper>
    );
};

export default SidebarGallery;
