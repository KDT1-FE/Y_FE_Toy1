import styled, { keyframes } from 'styled-components';
import { BtnClassic } from '../Timer/style';

export const ModalBtnImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
`;

export const ModalBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MyPage = styled.div<{ value: boolean }>`
    right: ${(props) => (props.value ? '0' : '-500px')};
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 25vw;
    max-width: 400px;
    min-width: 350px;
    background-color: #fafafa;
    top: 72px;
    border-left: 1px solid #ece7ec;
    box-sizing: border-box;
    z-index: 11;
    transition: 1s;
    border-radius: 0 20px;
    overflow: hidden;
`;

export const MyPageExitBtn = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: 35px;
    border: none;
    background-color: #fafafa;
    border-radius: 10px;
    &:hover {
        background-color: #e2e2e2;
        transition: 0.3s;
    }
`;

export const MyPageCase = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 5%;
`;
export const MyPageHeader = styled(MyPageCase)`
    border-bottom: 1px solid #ece7ec;
`;

export const MyPageProfile = styled.div`
    padding: 10% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;
export const ProfileImg = styled.img`
    width: 18rem;
    height: 18rem;
    background-color: rgba(15, 15, 15, 0.1);
    border-radius: 20px;
`;
export const ProfileContent = styled(MyPageCase)`
    height: 5%;
    font-size: 20px;
    font-weight: 700;
    padding: 0;
`;
export const ProfileEdit = styled.span`
    font-size: 18px;
    color: var(--active-item);
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        transform: scale(1.1);
    }
`;
export const ProfileIntroduce = styled.div`
    width: 100%;
    height: 20%;
    background-color: #fff;
    border: 1px solid #ece7ec;
    border-radius: 10px;
    padding: 10px;
`;
export const MyPageContents = styled(MyPageCase)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    border-top: 1px solid #ece7ec;
    border-bottom: 1px solid #ece7ec;
`;

export const MyPageFooter = styled(MyPageContents)`
    justify-content: center;
`;

export const MarginLeft = styled.span`
    font-size: 20px;
    font-weight: 700;
    cursor: default;
`;

export const GreenCircle = styled.span`
    color: var(--active-current-status);
`;

const Blink = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
`;
export const RedCircle = styled.span<{ value: boolean }>`
    display: ${(value) => (value.value ? 'block' : 'none')};
    color: #ca1212;
    font-size: 60px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 8px;
    animation: ${Blink} 1.5s 0s infinite;
    animation-timing-function: linear;
`;

export const TimelogBox = styled.div`
    width: 100%;
    height: calc(100% - 80px);
    padding: 10% 10% 10% calc(10% + 5px);
    box-sizing: border-box;
`;
export const TimelogBoxScroll = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    border-left: 1px solid #ece7ec;
    padding: 23% 0;
    overflow: auto;
    transition: 1s;
    &::-webkit-scrollbar {
        display: none;
    }
    &::-webkit-scrollbar-thumb {
        width: 3px;
        border-radius: 10px;
        background-color: var(--navigation-background);
        box-shadow: 1px 1px 5px 2px #dadce0;
    }
    &::-webkit-scrollbar-track {
        background-color: #fff;
        box-shadow: 0 3px 3px 1px #a7a7a8 inset;
    }
    &:hover {
        background-color: rgba(15, 15, 15, 0.1);
    }
`;

export const TimelogEl = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    width: 90%;
    border: 1px solid #ece7ec;
    border-radius: 20px;
    background-color: #fafafa;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.3);
    &:hover {
        transform: scale(1.05);
        transition: 0.2s;
    }
`;
export const TimelogText = styled.p`
    height: 110px;
    white-space: pre;
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: #555555;
    justify-content: center;
    align-items: center;
`;

export const EditBox = styled.div`
    width: 100%;
    padding: 5% 10%;
    display: flex;
    justify-content: space-between;
`;
export const EditInputBox = styled.div`
    display: flex;
    width: 50%;
    gap: 20px;
    flex-direction: column;
`;
export const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
`;
export const EditInput = styled.input`
    height: 35px;
    border-radius: 5px;
    font-size: 18px;
    border: 1px solid #7e7e7e;
    &:focus {
        outline: none;
        border: none;
        box-shadow: 0 1px 6px var(--active-item);
    }
`;
export const InputImg = styled.img`
    width: 13rem;
    height: 13rem;
    border-radius: 20px;
    background-color: gray;
`;
export const SubmitBtn = styled(BtnClassic)`
    color: var(--text);
    background-color: var(--active-current-status);
`;
export const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
`;
export const FlexBoxColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
