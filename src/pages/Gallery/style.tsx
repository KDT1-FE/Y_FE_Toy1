import styled, { keyframes } from 'styled-components';
import bin from '../../common/Gallery/bin.png';
import upload from '../../common/Gallery/icons8-upload-64.png';

//갤러리 전체
export const GalleryContainer = styled.div`
    display: flex;
    height: 100vh;
    padding-top: 72px;
    width: 100vw;
    overflow: hidden;
`;

// 컨텐츠 영역
export const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 3%;
    background-color: ${(props) => props.theme.recruitmentBack};
`;

export const RecruitConstainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.recruitmentBack};
`;

export const ArticleContainer = styled.div`
    overflow-y: auto;
    height: calc(100vh - 72px);
    box-sizing: border-box;
    display: flex;
    align-content: center;
    justify-content: center;
`;

export const ContentFirstLine = styled.div`
    position: fixed;
    z-index: 2;
    left: 22%;
    top: 100px;
    font-size: 30px;
`;

export const UploadBtn = styled.button`
    position: fixed;
    right: 20px;
    bottom: 40px;
    font-size: 60px;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    font-size: 26px;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    background-color: ${(props) => props.theme.activeColor1};
    color: white;
    cursor: pointer;
    background-color: transparent;
    background-image: url(${upload});
    background-position: cover;
    background-size: cover;
    background-repeat: no-repeat;
    &:hover {
        filter: brightness(90%);
    }
`;

export const UploadBtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 1%;
    padding-right: 8%;
    background-color: transparent;
    z-index: 1;
`;
// 아티클 영역
const jumpShaking = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateY(-9px) }
  35% { transform: translateY(-9px) rotate(17deg) }
  55% { transform: translateY(-9px) rotate(-17deg) }
  65% { transform: translateY(-9px) rotate(17deg) }
  75% { transform: translateY(-9px) rotate(-17deg) }
  100% { transform: translateY(0) rotate(0) }
`;

export const TrashCan = styled.div`
    width: 100px;
    height: 100px;
    position: fixed;
    right: 20px;
    bottom: 40px;
    font-size: 60px;
    background-image: url(${bin});
    background-size: cover;
    animation: ${jumpShaking} 2s ease-in-out infinite;
    z-index: -1;
`;

export const ImgContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 10px;
`;

export const StyleProfile = styled.div`
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    height: calc(100vh - 72px);
    gap: 98px;
    width: 1100px;
    overflow-y: auto;
`;

export const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 250px;
    text-align: center;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 2px 2px 1px 2px rgba(0, 0, 0, 0.3);
`;
export const ProfileIMG = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 10px 10px 0 0;
`;
export const ProfileName = styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: 500;
`;
// 모달
export const ModalContainer = styled.div`
    width: 650px;
    height: 420px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 15px 25px;
`;

export const ModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalFirstLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`;

export const ModalLabel = styled.label`
    font-size: 20;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ModalTextarea = styled.textarea`
    width: 100%;
    font-size: 16px;
    resize: none;
    border: 2px solid rgb(118, 118, 118);
    border-radius: 5px;
    &:focus {
        outline: none;
        border: 1px solid ${(props) => props.theme.recruitmentBack};
        box-shadow: 0px 1px 6px ${(props) => props.theme.navBar};
    }
`;

export const Formalign = styled.form`
    display: flex;
    flex-direction: column;
`;

export const InputAndPreview = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

export const InputContainer = styled.div`
    display: flex;
    margin: 10px 10px 10px 0;
    flex-direction: column;
    z-index: 2;
`;

export const LinkInput = styled.input`
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 16px;
    &:focus {
        outline: none;
        border: 1px solid ${(props) => props.theme.recruitmentBack};
        box-shadow: 0px 1px 6px ${(props) => props.theme.navBar};
    }
`;

export const LinkInputContainer = styled.div`
    margin-top: 12px;
    margin-bottom: 35px;
`;

export const Description = styled.div`
    position: absolute;
    display: flex;
    align-items: flex-end;
    top: 0;
    left: 0;
    width: 300px;
    height: 200px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 8px;
    font-size: 20px;
    opacity: 0; /* 설명을 숨깁니다. */
    transition: opacity 0.3s ease-in-out;
    overflow: hidden;
`;

export const ChildArticle = styled.li`
    display: flex;
    align-items: flex-start;
    padding-bottom: 5%;
    &:hover ${Description} {
        opacity: 1;
    }
`;

export const PreviewBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0px 10px 10;

    &:hover ${Description} {
        opacity: 1;
    }
`;
export const PreviewImg = styled.img`
    width: 300px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
    position: relative;
`;

export const PlaceHolder = styled.div`
    width: 300px;
    height: 200px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${(props) => props.theme.recruitmentBack};
`;

export const SubmitBtn = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    margin: 25px;
    border: none;
    background-color: ${(props) => props.theme.activeColor1};
    color: white;
    cursor: pointer;
    font-size: 20px;
    &:hover {
        filter: brightness(110%);
    }
`;
export const CancelBtn = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0.5px solid black;
    background-color: #fff;
    color: #000;
    font-size: 20px;
    margin: 25px;
    cursor: pointer;
    &:hover {
        filter: brightness(90%);
    }
`;

export const BtnAlign = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
