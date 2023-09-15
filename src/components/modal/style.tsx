import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 540px;
    background-color: #fff;
    z-index: 10;
    border-radius: 20px;
    box-shadow: 0 5px 5px 2px #7e7e7e;
    overflow: hidden;
`;

export const ModalWall = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(45, 45, 45, 0.4);
`;

export const CloseBtn = styled.button`
    width: 25px;
    height: 25px;
    position: absolute;
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
    background-color: #350d36;
    width: 100%;
    height: 80px;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
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
    background-color: #2bac76;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

export const Timebox = styled.div`
    width: 100%;
    height: 300px;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 150px;
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

export const OnBtn = styled.button<{ value: boolean }>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 120px;
    height: 72px;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    color: ${(value) => (value.value ? '#000' : '#fff')};
    background-color: ${(value) => (value.value ? '#ece7ec' : '#350d36')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3 inset' : '0 3px 3px 1px #ced0d3')};
`;
export const OffBtn = styled.button<{ value: boolean }>`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 120px;
    height: 72px;
    color: #fff;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    background-color: ${(value) => (value.value ? '#350d36' : '#948D94')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3' : 'none')};
`;
