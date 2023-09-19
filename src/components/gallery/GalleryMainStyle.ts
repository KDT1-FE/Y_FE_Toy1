import styled from "styled-components";

export const GalleryMain = styled.div`
  // border: 1px solid gold;
  padding: 2rem;
  border: 0.06rem solid var(--color-light-gray);
  border-radius: 0.25rem;
  background-color: var(--color-white);
  width: 100%;
  height: 44.75rem;
  overflow: auto;
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
  // place-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media screen and (max-width: 1230px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 912px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ImgWrap = styled.div`
  // border: 1px solid green;
  height: 22rem;
  // width: 18rem;
  display: flex;
  justify-content: center;
  algin-items: center;
`;

export const Img = styled.div<{ img?: string; background?: string }>`
  cursor: pointer;
  border: 0.06rem solid var(--color-light-gray);
  border-radius: 0.94rem;
  height: 100%;
  width: 100%;
  background-color: ${({ img }) => img};
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export const Loading = styled.div`
  width: 30px;
  height: 30px;
  margin: 100px auto;
  border: 4px solid var(--color-main);
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader 1s infinite linear;

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
