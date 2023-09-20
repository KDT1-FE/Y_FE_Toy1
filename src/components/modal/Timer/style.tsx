import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    height: 400px;
    background-color: #fafafa;
    border-radius: 20px;
    box-shadow: 0 5px 5px 2px #7e7e7e;
    overflow: hidden;
`;

export const ModalWall = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const CloseBtn = styled.button`
    width: 30px;
    height: 30px;
    position: absolute;
    font-size: 18px;
    top: 10px;
    right: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-weight: 700;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.5s all;
    &:hover {
        background-color: #c9c9c9;
    }
`;

export const ModalHeader = styled.div`
    background-color: ${(props) => props.theme.navBar};
    width: 100%;
    height: 80px;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

export const Dday = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-weight: 600;
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
    height: 62px;
    border: none;
    border-radius: 20px;
    font-size: 24px;
    font-weight: 700;
    box-shadow: 0 3px 3px 1px #ced0d3;
    cursor: pointer;
`;
