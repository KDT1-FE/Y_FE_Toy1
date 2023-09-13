import styled from '@emotion/styled';

export const HomeContainer = styled.div`
    z-index: 1;
    background-color: white;
`;

export const AboutContainer = styled.div`
    width: 100vw;
    height: 100vh;

    position: relative;
`;

export const AboutImg = styled.img`
    width: 35vw;

    position: absolute;
    right: 3rem;
    top: 10rem;
`;

export const AboutWrapper = styled.div`
    position: relative;
    z-index: 2;

    margin-top: 10rem;
    margin-left: 4rem;
`;

export const AboutUs = styled.p`
    font-size: 1.5rem;
`;

export const AboutTitle = styled.h1`
    font-size: 3.5rem;
    margin-top: 0;
    margin-bottom: 0;
`;

export const AboutSubTitle = styled.h2`
    color: #c3c4c7;
    font-size: 2.5rem;
`;

export const AboutContent = styled.p`
    margin-top: 1rem;
    font-size: 1.5rem;
`;
