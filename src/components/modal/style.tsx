import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 540px;
    background-color: red;
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
    border-radius: 25px;
    &:hover {
        background-color: #c9c9c9;
    }
`;

export const ModalHeader = styled.div`
    background-color: #350d36;
    width: 100%;
    height: 80px;
`;
