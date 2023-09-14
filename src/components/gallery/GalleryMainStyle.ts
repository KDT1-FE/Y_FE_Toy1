import styled from "styled-components";

export const Temp = styled.div`
  // border: 1px solid gold;
  padding: 2rem;
  border: 0.06rem solid #e6e6e6;
  border-radius: 0.94rem;
  background-color: #fff;
  width: calc(100% - 15rem - 3rem);
  height: 44.75rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: transparent;
    border: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6.25rem;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #d3d3d3;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.div`
  color: #4a4a4a;
  font-weight: bold;
  font-size: 1.13rem;
  line-height: normal;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImgContainer = styled.div`
  // border: 1px solid red;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const ImgWrap = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  algin-items: center;
`;

export const Img = styled.div<{ img: string; background: string }>`
  border: 0.06rem solid #e6e6e6;
  border-radius: 0.94rem;
  background-color: ${({ img }) => img};
  width: 18rem;
  height: 18rem;
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
