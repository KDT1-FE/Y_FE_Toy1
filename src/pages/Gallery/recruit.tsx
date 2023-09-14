// Recruit.tsx
import React, { useState } from 'react';
import { RecruitConstainer } from './style';
import UploadModal from './UploadModal/uploadModal';

const Recruit: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [companyData, setCompanyData] = useState<any>({});

    const showModal = () => {
        setModalOpen(true);
    };

    const handleUpload = (formData: FormData) => {
        // 여기에서 formData를 사용하여 업로드 또는 처리 작업 수행
        // formData에서 필요한 데이터를 추출하여 상태 업데이트
        const recruitURL = formData.get('recruitURL') || '';
        const thumbnailText = formData.get('thumbnailText') || '';
        const thumbnailURL = URL.createObjectURL(formData.get('thumbnailURL') as Blob);

        const newCompanyData = {
            recruitURL,
            thumbnailText,
            thumbnailURL,
        };

        setCompanyData(newCompanyData);
    };

    return (
        <RecruitConstainer>
            <input type="button" value={'업로드'} onClick={showModal} />
            {modalOpen && <UploadModal setModalOpen={setModalOpen} onUpload={handleUpload} />}
            <div>
                <a href={companyData.recruitURL} target="_blank" rel="noopener noreferrer">
                    <img src={companyData.thumbnailURL} alt={companyData.thumbnailText} />
                </a>
                <div>{companyData.thumbnailText}</div>
            </div>
        </RecruitConstainer>
    );
};

export default Recruit;
