import styled from "styled-components";

export const CommuteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  height: 320px;
  border-radius: 20px;
  background-color: #dfe3ff;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index : 2;

  padding: 16px 16px;
`;

export const CommuteHeader = styled.div`
    display: flex;
    justify-content : space-between;
    width : 100%;
    margin-top : 10px;
    padding : 10px 20px 0;


`;

export const ExitBtn = styled.button`
    position: absolute;
    right : 20px;
    border : 0;
    border-radius : 50%;
    background-color : red;
    color : white;
    width : 15px;
    height : 15px;
    cursor: pointer;


`;
export const CommuteTitle = styled.div`
    font-size : 25px;
    font-weight : 600;
    letter-spacing : -2px;

`;
export const DateText = styled.div`
    font-size : 13px;
    font-weight : 600;
    margin : auto 0;
`;

export const TimerContainer = styled.div`
    display : flex;
    background-color : white;
    border-radius : 20px;
    height : 150px;
    width : 408px;
    margin-top: 10px;
    justify-content : center;
    text-align : center;
`;

export const TimerText = styled.div`
    font-size : 40px;
    font-weight : 600;
    margin : auto 0;
    letter-spacing : 5px;
`;

export const BtnContainer = styled.div`
    display : flex;
    justify-content : space-between;
    width : 408px;
    margin-top: 20px;
`;

export const TimerBtn = styled.div`
    background-color : rgba(72, 74, 173, 0.8);
    color : white;
    border-radius : 50px;
    padding : 7px 0;
    width : 196px;
    text-align : center;
    cursor: pointer;

    
`;

interface CommuteBtnProps {
    commute: string;
  }
  export const CommuteBtn = styled.div<CommuteBtnProps>`
  background-color: ${props =>
    props.commute ==='true' ? '#EB9494' : 'rgba(72, 74, 173, 0.8)'}; // 출근 시와 퇴근 시의 색상을 조절합니다.
  color: white;
  border-radius: 50px;
  padding: 7px 0;
  width: 196px;
  text-align: center;
`;

