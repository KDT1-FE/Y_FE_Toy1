import React, { useEffect, useState } from 'react';
import { AllChannelsWrapper, ChannelWrapper, ChannelFlexDiv, SubChannelFlexDiv, ChannelHr } from './style';

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

    useEffect(() => {
        const updatedQuerySnapshot = handleGetDocs('gallery', (querySnapshot: QuerySnapshot<DocumentData>) => {
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
        onKeyClick(value); // 클릭된 값을 상위 컴포넌트로 전달합니다.
    };

    return (
        <AllChannelsWrapper>
            {docsWithFields.map((item, index) => (
                <ChannelWrapper key={index}>
                    <ChannelFlexDiv>
                        <div style={{ fontSize: '20px', fontWeight: 'bold' }}># {item.docId}</div>
                    </ChannelFlexDiv>

                    <div style={{ marginLeft: '20px' }}>
                        {item.docKeys.map((item2, index2) => (
                            <SubChannelFlexDiv onClick={() => handleKeyClick(item.docData[item2])}>
                                <div key={index2}>{item2}</div>
                            </SubChannelFlexDiv>
                        ))}
                    </div>

                    <ChannelHr />
                </ChannelWrapper>
            ))}
        </AllChannelsWrapper>
    );
};

export default SidebarGallery;
