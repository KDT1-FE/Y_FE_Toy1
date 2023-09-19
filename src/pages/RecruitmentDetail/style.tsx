import styled from '@emotion/styled';

export const RecruitmentDetailContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;

    overflow: auto;
    background-color: var(--mention-badge);

    position: relative;
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

    position: relative;
`;

export const ContentHeader = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #efefef;
    position: relative;
`;

export const ContentHeaderName = styled.div`
    margin-left: 50px;

    font-size: 1.2rem;
    font-weight: 500;
`;

export const ContentUserImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 20px;

    position: absolute;
    top: 8px;
    left: 10px;
`;

export const ContentHeaderValuedTrue = styled.div`
    margin-right: 20px;
    padding: 4px 10px;

    font-size: 1rem;

    color: white;
    background-color: var(--active-current-status);

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

export const CommentWrapper = styled.div`
    width: 95%;
    min-height: 140px;
    height: auto;

    background-color: white;

    margin: 20px auto;
    padding: 20px 0;
`;

export const CommentItemWrapper = styled.div`
    width: 100%;
    height: 100px;

    padding: 20px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-bottom: 1px solid #efefef;

    position: relative;
`;

export const CommentName = styled.div`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 10px;
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
    margin-right: 10px;
    padding: 3px 6px;

    background-color: #ffffff;
    color: black;

    height: 30px;
    width: 70px;

    font-size: 0.8rem;
    font-weight: bold;

    border: 1px solid gray;
    border-radius: 8px;
    border: 0.5px solid black;

    &:hover {
        cursor: pointer;
        background-color: #efefef;
    }
`;

export const RecruitmentEndBtn = styled.button`
    margin-right: 10px;
    padding: 3px 6px;

    background-color: #ffffff;
    color: black;

    height: 35px;
    width: 80px;

    font-size: 1rem;
    font-weight: bold;

    border: 1px solid gray;
    border-radius: 8px;
    border: 0.5px solid black;

    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
        cursor: pointer;
        background-color: #efefef;
    }
`;

export const CommentNameInput = styled.input`
    font-size: 1rem;
    font-weight: 500;
`;

export const CommentCreateWrapper = styled.div`
    width: 98%;

    margin: 0 auto;
    padding: 20px;

    border-radius: 20px;
    border: 1px solid gray;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CommentInputWrapper = styled.div`
    display: flex;
`;

export const CommentBtn = styled.button`
    margin-left: 20px;
    height: 60px;
`;
// DeleteModal

export const DeleteModalContainer = styled.div`
    position: absolute;
    margin-top: -72px;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
`;

export const DeleteModalWrapper = styled.div`
    width: 500px;
    height: 350px;

    padding: 20px;

    background-color: white;

    z-index: 3;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);

    border-radius: 20px;
`;

export const DeleteModal = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const DeleteModalTitle = styled.div`
    font-weight: bold;
    font-size: 1.7rem;
`;

export const DeleteCloseButton = styled.button`
    font-size: 1.5rem;
    padding: 0 10px;

    border: none;
    border-radius: 5px;
    background-color: #ffffff;

    margin-right: 10px;

    position: absolute;
    top: 0;
    right: 0;
    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

export const DeleteText = styled.div`
    width: 100%;
    height: 150px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.3rem;
`;

export const DeleteFallbackButton = styled.button`
    background-color: #ffffff;
    color: black;

    height: 40px;
    width: 80px;

    font-size: 1.2rem;
    font-weight: bold;

    border: 1px solid gray;
    border-radius: 5px;
    border: 0.5px solid black;

    margin-top: 1rem;
    margin-left: 1rem;

    &:hover {
        cursor: pointer;
    }
`;

export const DeleteCreateButton = styled.button`
    background-color: #2bac76;
    color: #ffffff;

    height: 40px;
    width: 80px;

    font-size: 1.2rem;
    font-weight: bold;

    border: 1px solid gray;
    border-radius: 5px;
    border: none;

    margin-top: 1rem;
    margin-left: 30%;

    &:hover {
        cursor: pointer;
    }
`;
