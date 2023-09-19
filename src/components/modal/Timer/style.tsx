import styled from 'styled-components';

export const ModalBtnBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeaderModalBtn = styled.div`
    font-weight: 500;
    font-size: 24px;
    color: var(--text);
    cursor: pointer;
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 520px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 5px 5px 2px #7e7e7e;
    overflow: hidden;
`;
export const TimerModal = styled(Modal)`
    width: 680px;
    height: 480px;
`;

export const ModalWall = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const CloseBtn = styled.button`
    width: 35px;
    height: 35px;
    position: absolute;
    font-size: 20px;
    top: 10px;
    right: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-weight: 700;
    border-radius: 25px;
    transition: 0.5s all;
    &:hover {
        background-color: #c9c9c9;
    }
`;

export const ModalHeader = styled.div`
    background-color: var(--navigation-background);
    width: 100%;
    height: 80px;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

export const Utils = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px;
`;

export const Dday = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
`;

export const ShowOn = styled.div<{ value: boolean }>`
    visibility: ${(value) => (value.value ? 'visible' : 'hidden')};
    width: 60px;
    height: 40px;
    color: #fff;
    background-color: #ca1212;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export const Timebox = styled.div`
    width: 100%;
    height: 45%;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 130px;
    & > p {
        display: block;
        font-size: 20px;
        margin-left: 2px;
    }
`;
export const Now = styled.span`
    font-size: 80px;
    font-weight: 700;
`;

export const BtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const BtnClassic = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 120px;
    height: 72px;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
`;

export const OnBtn = styled(BtnClassic)<{ value: boolean }>`
    margin-top: 2%;
    color: ${(value) => (value.value ? '#000' : '#fff')};
    background-color: ${(value) => (value.value ? '#ece7ec' : 'var(--active-current-status)')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3 inset' : '0 3px 3px 1px #ced0d3')};
`;
export const OffBtn = styled(BtnClassic)<{ value: boolean }>`
    margin-top: 2%;

    color: ${(value) => (value.value ? '#fff' : '#000')};
    background-color: ${(value) => (value.value ? 'var(--active-current-status)' : '#948D94')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3' : 'none')};
`;
