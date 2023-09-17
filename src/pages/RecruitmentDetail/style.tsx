import styled from '@emotion/styled';

// --navigation-background : #350d36;
// --cell-background: #3F0E40;
// --active-item: #1164A3;
// --active-item-text: #FFFFFF;
// --point-item: #4D2A51;
// --text: #FFF;
// --active-current-status: #2BAC76;
// --mention-badge: #ECE7EC;
// --navigation-background: #350D36;
// --navigation-text: #FFF;

export const RecruitmentDetailContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;
`;

export const ContentContainer = styled.div`
    background-color: #efefef;
    width: 100%;
    height: 100%;

    overflow: auto;
`;

export const ContentWrapper = styled.div`
    background-color: white;
    margin: 20px auto;

    width: 95%;
    min-height: 500px;
    height: auto;
`;

export const ContentHeader = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #efefef;
`;

export const ContentHeaderName = styled.div`
    margin-left: 20px;

    font-size: 1.2rem;
`;

export const ContentHeaderValuedTrue = styled.div`
    margin-right: 20px;
    padding: 4px 10px;

    font-size: 1rem;

    color: white;
    background-color: var(--active-item);

    border-radius: 15px;
`;

export const ContentHeaderValuedFalse = styled.div`
    margin-right: 20px;
    padding: 4px 10px;

    font-size: 1rem;

    color: black;
    background-color: #efefef;

    border-radius: 15px;
`;

export const ContentTitleWrapper = styled.div`
    width: 100%;
    height: 70px;

    padding-left: 20px;

    border-bottom: 1px solid #efefef;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ContentSub = styled.div`
    width: 100%;
    height: 70px;

    padding-left: 20px;

    border-bottom: 1px solid #efefef;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CommentBtn = styled.div`
    width: 150px;
    height: 50px;

    padding: 10px 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    background-color: var(--active-item);

    margin-left: 2.5%;
`;

export const CommentWrapper = styled.div`
    width: 95%;
    min-height: 200px;
    height: auto;

    background-color: white;

    margin: 20px auto;
`;

export const CommentItem = styled.div`
    width: 100%;
    height: 100px;

    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border: 1px solid #efefef;
`;

export const CommentName = styled.div`
    font-size: 1rem;
    font-weight: 500;
`;

export const CommentContent = styled.div`
    font-size: 1.2rem;
`;

export const CommentTime = styled.div`
    font-size: 1rem;
    color: #efefef;
`;
