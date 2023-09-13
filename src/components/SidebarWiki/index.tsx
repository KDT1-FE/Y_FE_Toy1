// SidebarWiki.tsx 파일 내에서
import React, { useEffect, useState } from 'react';
import { ChannelSidebar } from './style';

import { firestore, handleGetDocs } from '../../utils/firebase';

interface DocumentData {
    [key: string]: any;
}

interface SidebarWikiProps {
    onKeyClick: (value: any) => void; // 클릭된 값의 핸들러 함수를 props로 받습니다.
}

const SidebarWiki: React.FC<SidebarWikiProps> = ({ onKeyClick }) => {
    const [docsWithFields, setDocsWithFields] = useState<{ docId: string; docKeys: string[]; docData: DocumentData }[]>(
        [],
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await handleGetDocs();
                const data: { docId: string; docKeys: string[]; docData: DocumentData }[] = [];

                querySnapshot.forEach((doc) => {
                    const docData = doc.data();
                    const docId = doc.id;
                    const docKeys = Object.keys(docData);
                    data.push({ docId, docKeys, docData });
                });

                setDocsWithFields(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const handleKeyClick = (value: any) => {
        onKeyClick(value); // 클릭된 값을 상위 컴포넌트로 전달합니다.
    };

    return (
        <ChannelSidebar>
            {docsWithFields.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}># {item.docId}</div>
                    <div>
                        {item.docKeys.map((item2, index2) => (
                            <div key={index2} onClick={() => handleKeyClick(item.docData[item2])}>
                                &gt; {item2}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </ChannelSidebar>
    );
};

export default SidebarWiki;
