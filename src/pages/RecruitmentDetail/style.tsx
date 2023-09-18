import styled from '@emotion/styled';

export const RecruitmentDetailContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;

    overflow: auto;
    background-color: #efefef;
`;

export const ContentContainer = styled.div`
    width: 100%;
    max-width: 1080px;
    height: 100%;

    margin: 0 auto;
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

    position: relative;
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

export const CommentItemWrapper = styled.div`
    width: 100%;
    height: 100px;

    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border: 1px solid #efefef;

    position: relative;
`;

export const CommentName = styled.div`
    font-size: 1rem;
    font-weight: 500;
`;

export const CommentForm = styled.form`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CommentContent = styled.input`
    font-size: 1.2rem;
    background-color: white;
    border: none;
`;

export const CommentTime = styled.input`
    font-size: 0.8rem;

    background-color: white;
    border: none;

    color: black;
`;

export const BtnWrapper = styled.div`
    position: absolute;

    top: 20px;
    right: 20px;

    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const Btn = styled.button`
    font-size: 0.8rem;

    color: black;
    background-color: #efefef;

    margin-right: 10px;
    padding: 3px 6px;

    border-radius: 5px;
`;

export const CommentNameInput = styled.input`
    font-size: 1rem;
    font-weight: 500;
`;
