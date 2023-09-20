import styled from "styled-components";

export const CurrentImgBg = styled.div<{ scale: number }>`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  & div {
    user-select: none;
  }

  & img {
    height: 100%;
    transform: scale(${({ scale }) => scale});
    // object-fit: cover;
  }
`;
// ><›‹→←

export const ImgWrap = styled.div`
  // border: 1px solid red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Exit = styled.div`
  z-index: 1000;
  cursor: pointer;
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  width: 30px;
  height: 30px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    background-color: rgba(150, 150, 150, 0.9);
  }
`;

export const Prev = styled.div`
  cursor: pointer;
  position: fixed;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  color: #fff;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "←";
  }

  &:hover {
    background-color: rgba(150, 150, 150, 0.9);
  }
`;

export const Next = styled(Prev)`
  left: auto;
  right: 5%;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "→";
  }
`;

export const Size = styled.div`
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  // width: 130px;
  // height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 1.3rem;
  border-radius: 3rem;

  & > div {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > div:hover {
    background-color: rgba(150, 150, 150, 0.9);
  }
`;

export const DeleteBtn = styled.div`
  border: 1px solid red;
  cursor: pointer;
  color: red;
  font-weight: bold;
  padding: 3px 6px;
  position: fixed;
  top: 2%;
  right: 2%;
`;
