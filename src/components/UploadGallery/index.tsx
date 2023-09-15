import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import closeButton from '../../assets/icons/closeButton.svg';

function UploadGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  const closeModal = () => {
    setModalOpen(false);
    setPreview(null);
  };

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const imgRegister = () => {
    if (preview === null) {
      alert('사진 업로드 후 등록해주세요');
      return;
    }
    closeModal();
  };

  return (
    <>
      <StyledGalleryContainer>
        <StyledButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + 사진 등록하기
        </StyledButton>
      </StyledGalleryContainer>
      <ReactModal isOpen={modalOpen} style={StyledModal}>
        <StyledCloseImg
          src={closeButton}
          alt="close button"
          onClick={closeModal}
        ></StyledCloseImg>
        <StyledContainer>
          <StyledImgContainer>
            {preview ? (
              <StyledUploadImg src={preview as string}></StyledUploadImg>
            ) : (
              <StyledImgText>⚠️ 파일을 업로드 해주세요</StyledImgText>
            )}
          </StyledImgContainer>
          <StyledButtonContainer>
            <StyledContainerInput>
              <label htmlFor="ex_file">
                <div className="imgUpload">파일 업로드</div>
              </label>
              <input type="file" id="ex_file" onChange={handleChangeImg} />
            </StyledContainerInput>
            <StyledImgAdd onClick={imgRegister}>사진 등록</StyledImgAdd>
          </StyledButtonContainer>
        </StyledContainer>
      </ReactModal>
    </>
  );
}

const StyledGalleryContainer = styled.div`
  margin: 1.875rem;
  width: 100%;
  height: 56rem;
  position: relative;
`;

const StyledButton = styled.button`
  background-color: transparent;
  color: #3584f4;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const StyledModal: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '34.25rem',
    height: '27.5rem',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

const StyledCloseImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 95%;
  cursor: pointer;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 21.875rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledImgText = styled.p`
  color: #3584f4;
  font-size: 2rem;
  font-weight: 700;
`;

const StyledImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-bottom: 1rem;
`;

const StyledUploadImg = styled.img`
  width: 50%;
`;

const StyledButtonContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const StyledContainerInput = styled.div`
  margin-bottom: 1rem;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .imgUpload {
    width: 8.75rem;
    height: 2.5rem;
    background-color: #3584f4;
    color: #fff;
    padding: 0.625rem 2rem;
    border-radius: 5px;
    font-weight: 700;
  }
  .imgUpload:hover {
    background-color: #1b64da;
    transition: all 0.2s ease-in-out;
  }
`;

const StyledImgAdd = styled.button`
  width: 8.75rem;
  height: 2.5rem;
  background-color: #e2e8f0;
  color: #4a5568;
  padding: 0.625rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  border: none;

  &:hover {
    background-color: #f5f5f5;
    transition: all 0.2s ease-in-out;
  }
`;

export default UploadGallery;
