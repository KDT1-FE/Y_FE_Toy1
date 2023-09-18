import styled from 'styled-components';

export const GalleryContainer = styled.div`
    display: flex;
    padding-top: 72px;

    height: 100vh;
    width: 100vw;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const RecruitConstainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ModalR = styled.div`
    width: 300px;
    height: 200px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: gray;
    border: 1px solid black;
    border-radius: 8px;
`;
