// UploadModal.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ModalR } from '../style';

interface UploadModalProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    onUpload: (data: FormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ setModalOpen, onUpload }) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewText, setPreviewText] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile);
        } else {
            setPreviewImage(null);
            setFile(null);
        }
    };

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreviewText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            const recruitURLInput = document.getElementById('recruitURL') as HTMLInputElement;
            const thumbnailTextInput = document.getElementById('thumbnailText') as HTMLInputElement;
            formData.append('recruitURL', recruitURLInput.value || '');
            formData.append('thumbnailText', thumbnailTextInput.value || '');
            formData.append('thumbnailURL', file);

            onUpload(formData); // 업로드 함수 호출
            closeModal(); // 모달 닫기
        }
    };

    return (
        <ModalR>
            <form onSubmit={handleSubmit}>
                <button onClick={closeModal}>X</button>
                <label htmlFor="recruitURL"> 취업 링크 : </label>
                <input name="recruitURL" id="recruitURL" type="text" required />
                <label htmlFor="thumbnailText"> 회사명 : </label>
                <input name="thumbnailText" id="thumbnailText" type="text" required />
                <label htmlFor="thumbnailURL"> 회사로고 : </label>
                <input name="thumbnailURL" id="thumbnailURL" type="file" onChange={handleImageInputChange} />
                <input type="submit" />
                <div className="PreviewThumbnail">
                    {previewImage && (
                        <img src={previewImage} alt="Thumbnail Preview" style={{ width: '100px', height: '100px' }} />
                    )}
                    {previewText && <div className="text-thumbnail">{previewText}</div>}
                </div>
            </form>
        </ModalR>
    );
};

export default UploadModal;
