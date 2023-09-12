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

export const ShowOn = styled.div`
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
    align-items: center;
    justify-content: center;
    font-size: 80px;
    font-weight: 700;
`;

export const BtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const OnBtn = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 120px;
    height: 72px;
    background-color: #ece7ec;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    box-shadow: 0 3px 3px 1px #ced0d3 inset;
`;
export const OffBtn = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 120px;
    height: 72px;
    background-color: #350d36;
    color: #fff;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    box-shadow: 0 3px 3px 1px #ced0d3;
`;
