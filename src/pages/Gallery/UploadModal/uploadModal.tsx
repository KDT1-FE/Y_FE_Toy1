import React, { Dispatch, SetStateAction, useState } from 'react';
import { ModalR } from '../style';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, firestore } from '../../../utils/firebase';
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';

interface UploadModalProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    onUpload: (data: FormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ setModalOpen }) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [recruitURL, setRecruitURL] = useState<string>('');

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            const uniqueFileName = `${Date.now()}`;
            const uniqueFileStorageRef = ref(storage, `thumbnail/${uniqueFileName}`);

            await uploadBytes(uniqueFileStorageRef, file);
            console.log('Uploaded a blob or file to the "thumbnail" folder with a unique name!');

            const fileDownloadURL = await getDownloadURL(uniqueFileStorageRef);
            const currentDate = `${Date.now()}`;

            try {
                const docRef = doc(firestore, 'gallery', '레퍼런스 공유');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // 문서가 이미 존재할 경우, 기존 데이터에 새로운 데이터를 추가
                    const existingData = docSnap.data();
                    const newData = {
                        recruitURL: recruitURL,
                        thumbnailURL: fileDownloadURL,
                    };
                    const updatedData = {
                        ...existingData,
                        취업: {
                            ...existingData.취업,
                            articleR: {
                                ...(existingData.취업?.articleR || {}),
                                [currentDate]: newData,
                            },
                        },
                    };
                    await setDoc(docRef, updatedData);
                } else {
                    // 문서가 존재하지 않을 경우, 새로운 문서를 생성
                    const newData = {
                        취업: {
                            articleR: {
                                [currentDate]: {
                                    recruitURL: recruitURL,
                                    thumbnailURL: fileDownloadURL,
                                },
                            },
                        },
                    };
                    await setDoc(docRef, newData);
                }

                console.log('레퍼런스 데이터 추가 성공');
            } catch (error) {
                console.error('레퍼런스 데이터 추가 실패:', error);
            }

            closeModal();
        }
    };

    const handleImageClick = () => {
        if (recruitURL) {
            window.open(recruitURL, '_blank');
        }
    };

    return (
        <ModalR>
            <form onSubmit={handleSubmit}>
                <button onClick={closeModal}>X</button>
                <label htmlFor="recruitURL"> 취업 링크 : </label>
                <input
                    name="recruitURL"
                    id="recruitURL"
                    type="text"
                    required
                    value={recruitURL}
                    onChange={(e) => setRecruitURL(e.target.value)}
                />
                <label htmlFor="thumbnailURL"> 회사로고 : </label>
                <input name="thumbnailURL" id="thumbnailURL" type="file" onChange={handleImageInputChange} required />
                <input type="submit" />
                <div className="PreviewThumbnail" onClick={handleImageClick}>
                    {previewImage && (
                        <img src={previewImage} alt="Thumbnail Preview" style={{ width: '100px', height: '100px' }} />
                    )}
                </div>
            </form>
        </ModalR>
    );
};

export default UploadModal;
