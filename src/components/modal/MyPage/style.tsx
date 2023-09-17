import styled from 'styled-components';

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
    transition: 1.5s;
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
    align-items: center;
    gap: 20px;
`;
export const ProfileImg = styled.img`
    width: 22rem;
    height: 22rem;
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
`;
export const ProfileIntroduce = styled.div`
    width: 100%;
    height: 22rem;
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
export const RedCircle = styled.span`
    color: #ca1212;
    font-size: 60px;
    font-weight: 700;
    line-height: 1;
`;
