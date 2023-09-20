import React, { useState } from 'react';
import {
    BtnAlign,
    CancelBtn,
    Description,
    Formalign,
    InputAndPreview,
    InputContainer,
    LinkInput,
    LinkInputContainer,
    ModalContainer,
    ModalFirstLine,
    ModalLabel,
    ModalTextarea,
    PlaceHolder,
    PreviewBox,
    PreviewImg,
    SubmitBtn,
} from '../style';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, firestore } from '../../../utils/firebase';

interface ModalProps {
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    const [link, setLink] = useState(''); // 링크 입력 상태
    const [imageFile, setImageFile] = useState<Blob | null>(null); // 이미지 파일 상태
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [textValue, setTextValue] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const handleTextChange = (e: any) => {
        setTextValue(e.target.value);
    };

    // 링크 입력 핸들러
    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

    // 이미지 파일 선택 핸들러
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setImageFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        // 유닉한 이미지 이름
        const uniqueName = Date.now();
        // storage 경로에 현재 시간을 추가하여 고유한 경로 참조
        const storageRef = ref(storage, 'thumbnailT/' + uniqueName);
        // storage에 이미지 파일이 존재하는 경우에만 업로드
        if (imageFile) {
            await uploadBytes(storageRef, imageFile);
        }
        // storage에 업로드 된 이미지 URL 가져오기
        const url = await getDownloadURL(storageRef);
        // thumbnaulURL 에 이미지 url 할당
        setThumbnailURL(url);

        // firestore 경로에 고유한 경로 참조
        const storeRef = doc(firestore, 'gallery', '레퍼런스 공유');
        // firestore 추가할 데이터
        const newArticle = {
            thumbnailURL: url,
            recruitURL: link,
            index: uniqueName,
            description: textValue,
        };
        // firestore 데이터를 취업/articleR 필드에 추가
        await updateDoc(storeRef, {
            '테크.articleT': arrayUnion(newArticle),
        });
        setIsUploading(false);
        //모달 닫기
        onClose();
    };

    return (
        <ModalContainer>
            <ModalFirstLine>
                <h2>테크 링크 공유</h2>
                <span className="close" onClick={onClose} style={{ cursor: 'pointer', fontSize: '30px' }}>
                    &times;
                </span>
            </ModalFirstLine>
            <Formalign onSubmit={handleSubmit}>
                <InputAndPreview>
                    <InputContainer>
                        <div>
                            <ModalLabel htmlFor="image">썸네일</ModalLabel>
                            <br />
                            <input type="file" id="image" accept="image/*" onChange={handleImageChange} required />
                        </div>
                        <LinkInputContainer>
                            <ModalLabel htmlFor="link">링크</ModalLabel>
                            <br />
                            <LinkInput
                                type="text"
                                id="link"
                                value={link}
                                onChange={handleLinkChange}
                                required
                                placeholder="https://www.example.com"
                            />
                        </LinkInputContainer>
                        <div>
                            <ModalLabel htmlFor="description">레퍼런스 설명</ModalLabel>
                            <br />
                            <ModalTextarea
                                placeholder="공유할 레퍼런스를 설명해주세요!"
                                maxLength={50}
                                value={textValue}
                                onChange={handleTextChange}
                                required
                            />
                            <div>{textValue.length}/100</div>
                        </div>
                    </InputContainer>
                    <PreviewBox>
                        {imageFile ? (
                            <a href={link} target="_blank" style={{ position: 'relative' }}>
                                <PreviewImg src={URL.createObjectURL(imageFile)} alt="미리보기" />
                                <Description>{textValue}</Description>
                            </a>
                        ) : (
                            <PlaceHolder />
                        )}
                        <BtnAlign>
                            <CancelBtn onClick={onClose}>취소</CancelBtn>
                            <SubmitBtn type="submit" disabled={isUploading}>
                                {isUploading ? '업로드 중' : '제출'}
                            </SubmitBtn>
                        </BtnAlign>
                    </PreviewBox>
                </InputAndPreview>
            </Formalign>
        </ModalContainer>
    );
};

export default Modal;
