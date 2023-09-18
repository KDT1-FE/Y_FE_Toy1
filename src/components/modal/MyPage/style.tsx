import styled, { keyframes } from 'styled-components';

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
    width: 30vw;
    max-width: 500px;
    height: calc(100vh - 72px);
    background-color: #fafafa;
    top: 72px;
    border-left: 1px solid #ece7ec;
    box-sizing: border-box;
    z-index: 11;
    transition: 1s;
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
    height: 8%;
    padding: 0 5%;
`;
export const MyPageHeader = styled(MyPageCase)`
    border-bottom: 1px solid #ece7ec;
`;

export const MyPageProfile = styled.div`
    flex-grow: 1;
    padding: 10% 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;
export const ProfileImg = styled.img`
    width: 20rem;
    height: 20rem;
    background-color: red;
    border-radius: 20px;
`;
export const ProfileContent = styled(MyPageCase)`
    height: 5%;
    font-size: 25px;
    font-weight: 700;
    padding: 0;
`;
export const ProfileEdit = styled.span`
    font-size: 18px;
    color: var(--active-item);
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
`;
export const ProfileIntroduce = styled.div`
    width: 100%;
    height: 25%;
    border-radius: 20px;
    border: 1px solid #ece7ec;
    background-color: #fff;
    padding: 2%;
`;
export const MyPageContents = styled(MyPageCase)`
    border-top: 1px solid #ece7ec;
`;

export const MyPageFooter = styled(MyPageContents)`
    justify-content: center;
`;

export const MarginLeft = styled.span`
    font-size: 25px;
    font-weight: 700;
    cursor: default;
`;

export const MarginLeftContents = styled(MarginLeft)`
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
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
    margin-bottom: 10px;
    animation: ${Blink} 1.5s 0s infinite;
    animation-timing-function: linear;
`;

export const TimelogBox = styled.div`
    width: 100%;
    height: calc(100% - 80px);
    padding: 10%;
`;
export const TimelogBoxScroll = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        width: 5px;
        border-radius: 10px;
        background-color: var(--navigation-background);
    }
    &::-webkit-scrollbar-track {
        background-color: #fff;
        box-shadow: 0 3px 3px 1px #a7a7a8 inset;
    }
`;

export const TimelogEl = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30%;
    border: 1px solid black;
`;
