import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.div`
  border-radius: 0.5rem;
  width: 30rem;
  height: 23rem;
  padding: 1.4rem;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
`;

export const ImgLabel = styled.label`
  z-index: 1000;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 3px dashed var(--color-medium-gray);

  &:hover,
  &.active {
    border: 3px dashed var(--color-main);
    background-color: var(--color-area);
  }

  & > .preview_msg {
    margin-top: 1rem;
    font-weight: 500;
    color: var(--color-main);
  }
`;

export const ImgFile = styled.input`
  display: none;
`;

export const FileInfoContainer = styled.div<{
  background?: string;
}>`
  // border: 1px solid red;
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;

  & > .img_preview {
    // border: 1px solid red;
    // padding: 1rem;
    width: 50%;
    background-image: url(${({ background }) => background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`;

export const FileInfoWrap = styled.ul`
  // border: 1px solid red;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > li {
    padding-left: 10px;
    margin: 0.3rem;
  }
  & > li:last-of-type {
    display: none;
  }
  & > li > div:first-of-type {
    font-weight: bold;
  }
`;
