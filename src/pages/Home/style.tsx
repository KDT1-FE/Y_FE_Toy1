import styled from 'styled-components';

export const HomeBody = styled.div`
    margin: 0;
    overflow-y: hidden;
`;

export const Outer = styled.div`
    height: 100vh;
    background-color: #efefef;

    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Inner = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;

    position: relative;
`;

export const InnerBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const InnerHeadline = styled.h1`
    display: block;
    font-size: 7rem;

    text-align: center;
    margin: 0;
`;

export const InnerSubTitle = styled.p`
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
`;

export const InnerBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

export const SubInnerBox = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const SubInnerHeadline = styled.h1`
    display: block;
    font-size: 5rem;

    text-align: center;
    margin: 0;
`;

export const SubInnerSubTitle = styled.p`
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
`;

export const SubInnerBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;

export const SubInnerImg = styled.div`
    width: 650px;
    height: 450px;
`;
