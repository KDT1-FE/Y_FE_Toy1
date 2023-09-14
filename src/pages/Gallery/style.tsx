import styled from 'styled-components';

export const GalleryContainer = styled.div`
    display: flex;
    margin-top: 72px;
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

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
    /* translate는 본인의 크기 기준으로 작동한다. */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: gray;
    border: 1px solid black;
    border-radius: 8px;
`;
