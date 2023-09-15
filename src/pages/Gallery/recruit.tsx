import React, { useState, useEffect } from 'react';
import { RecruitConstainer } from './style';
import UploadModal from './UploadModal/uploadModal';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const Recruit: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [companyData, setCompanyData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(firestore, 'gallery', '레퍼런스 공유');
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();

                    // 취업 필드의 articleR 부분만을 추출
                    const articleRData = data?.취업?.articleR;

                    if (articleRData) {
                        const newData = Object.values(articleRData).map((entry: any) => ({
                            recruitURL: entry.recruitURL,
                            thumbnailURL: entry.thumbnailURL,
                        }));

                        setCompanyData(newData);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const docRef = doc(firestore, 'gallery', '레퍼런스 공유');
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                fetchData();
            }
        });

        fetchData();

        return () => unsubscribe();
    }, []);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <RecruitConstainer>
            <input type="button" value={'업로드'} onClick={showModal} />
            {modalOpen && <UploadModal setModalOpen={setModalOpen} />}
            <div>
                {companyData.map((data, index) => (
                    <div key={index}>
                        <a href={data.recruitURL} target="_blank" rel="noopener noreferrer">
                            <img src={data.thumbnailURL} alt="" />
                        </a>
                    </div>
                ))}
            </div>
        </RecruitConstainer>
    );
};

export default Recruit;
