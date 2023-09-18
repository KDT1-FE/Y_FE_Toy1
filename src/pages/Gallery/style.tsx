import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//갤러리 전체
export const GalleryContainer = styled.div`
    display: flex;
    margin-top: 72px;
    height: 100vh;
    width: 100vw;
`;

// 컨텐츠 영역
export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

export const RecruitConstainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

export const ContentFirstLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
`;

export const UploadBtn = styled.button`
    width: 70px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    border: none;
    background-color: var(--active-current-status);
    color: white;
    cursor: pointer;
`;

// 아티클 영역
export const TrashCan = styled.div`
    width: 80px;
    height: 80px;
    font-size: 60px;
`;

export const ImgContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    padding: 10px;
    &:-moz-window-dragging {
        transform: scale(0.85);
        transition: transform 1s ease;
    }
`;

export const StyleProfile = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    overflow-y: scroll;
    margin-top: 40px;
`;

export const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;
export const ProfileIMG = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
`;

// 모달
export const ModalContainer = styled.div`
    width: 400px;
    height: 220px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

export const ModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalFirstLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Formalign = styled.form`
    display: flex;
    flex-direction: row;
`;

export const LinkInput = styled.input`
    width: 80%;
    box-sizing: border-box;
    border-radius: 5px;
    &:focus {
        outline: none;
        border: 2px solid var(--mention-badge);
        box-shadow: 0px 0px 4px 2px var(--active-item);
    }
`;

export const LinkInputContainer = styled.div`
    margin-bottom: 20px;
`;
export const PreviewBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PlaceHolder = styled.div`
    width: 100px;
    height: 100px;
    background-color: var(--mention-badge);
`;

export const SubmitBtn = styled.button`
    width: 70px;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: middle;
    border: none;
    background-color: var(--active-current-status);
    color: white;
    cursor: pointer;
`;

export const SubmitBtnAlign = styled.div`
    display: flex;
    justify-content: center;
`;
