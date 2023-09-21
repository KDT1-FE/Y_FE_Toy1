import styled from 'styled-components';

export const CommuteModalBox = styled.div`
    width: 100%;
    height: 30%;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

// export const ModalWall = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100vw;
//     height: 100vh;
//     z-index: 100;
//     background-color: rgba(0, 0, 0, 0.6);
// `;

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

export const Dday = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
`;

export const ShowTimerOn = styled.div<{ value: boolean }>`
    visibility: ${(value) => (value.value ? 'visible' : 'hidden')};
    position: absolute;
    top: 2%;
    right: 2%;
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

export const TimeNowbox = styled.div`
    width: 100%;
    height: 80%;
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > p {
        font-size: 20px;
        margin-left: 2px;
    }
`;
export const TimeNow = styled.span`
    font-size: 50px;
    font-weight: 700;
`;

export const TimerBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10%;
`;

export const TimerBtnClassic = styled.button`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 90px;
    height: 52px;
    border: none;
    border-radius: 20px;
    font-size: 22px;
    font-weight: 700;
    box-shadow: 0 3px 3px 1px #ced0d3;
    cursor: pointer;
`;

export const TimerOnBtn = styled(TimerBtnClassic)<{ value: boolean }>`
    margin-top: 2%;
    color: ${(value) => (value.value ? '#000' : '#fff')};
    background-color: ${(value) => (value.value ? '#ece7ec' : 'var(--active-current-status)')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3 inset' : '0 3px 3px 1px #ced0d3')};
`;
export const TimerOffBtn = styled(TimerBtnClassic)<{ value: boolean }>`
    margin-top: 2%;

    color: ${(value) => (value.value ? '#fff' : '#000')};
    background-color: ${(value) => (value.value ? 'var(--active-current-status)' : '#ece7ec')};
    box-shadow: ${(value) => (value.value ? '0 3px 3px 1px #ced0d3' : '0 3px 3px 1px #ced0d3 inset')};
`;
export const ChangeTimer = styled.div<{ value: boolean }>`
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    box-shadow: ${(value) => (value.value ? '1px 2px 2px 1px #a0a0a0 inset' : 'none')};
`;
export const ChangeTimelog = styled.div<{ value: boolean }>`
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    box-shadow: ${(value) => (value.value ? 'none' : '1px 2px 2px 1px #a0a0a0 inset')};
`;
