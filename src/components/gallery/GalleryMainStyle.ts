import styled from "styled-components";

export const GalleryMain = styled.div`
  // border: 1px solid gold;
  padding: 2rem;
  border: 0.06rem solid var(--color-light-gray);
  border-radius: 0.94rem;
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

export const Img = styled.div<{ img: string; background: string }>`
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
    background-size: 105%;
  }

  &.skeleton {
    position: relative;
    background-color: var(--color-light-gray);
    background-image: none;
  }
  &.skeleton::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0)
    );
    transform: translateX(-100%);
    animation: skeleton-loader 2s infinite;
  }

  @keyframes skeleton-loader {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
