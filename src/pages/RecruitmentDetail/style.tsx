import styled from 'styled-components';

export const RecruitmentDetailContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;

    overflow: auto;
    background-color: ${(props) => props.theme.recruitmentBack};

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

    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;

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

export const Content = styled.div`
    padding: 20px;
    width: 100%;
    word-break: break-all;
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
    margin-right: 25px;
    padding: 4px 10px;

    font-size: 1rem;

    color: white;
    background-color: ${(props) => props.theme.activeColor2};

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
    height: 100px;

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

    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;

    margin: 20px auto;
    padding: 20px 0;
`;

export const CommentItemWrapper = styled.div`
    width: 100%;
    height: 100px;

    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    border-bottom: 1px solid #efefef;

    position: relative;
`;

export const CommentHeader = styled.div`
    position: relative;
`;

export const CommentUserImage = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 20px;

    position: absolute;
    top: 0px;
    left: 0px;
`;

export const CommentName = styled.p`
    font-size: 1rem;
    font-weight: 500;
    margin-left: 35px;
    margin-top: 2px;
`;

export const CommentInputName = styled.p`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 4px;
`;

export const CommentForm = styled.form`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CommentContent = styled.input`
    font-size: 1.2rem;
    margin-top: 5px;

    background-color: white;
    border: none;
`;

export const CommentTime = styled.input`
    font-size: 0.8rem;
    margin-left: 2px;

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
    padding: 5px 16px;

    background-color: #fff;
    border: 1px solid #efefef;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.4);

    font-size: 0.8rem;

    border-radius: 5px;

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

export const RecruitmentEndBtn = styled.button`
    margin-left: 10px;
    padding: 8px 24px;

    background-color: #fff;
    border: 1px solid #efefef;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.4);

    font-size: 0.8rem;
    font-weight: bold;

    border-radius: 5px;

    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

export const CommentCreateWrapper = styled.div`
    width: 98%;

    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;

    border-radius: 10px;
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
    width: 100px;
    height: 60px;

    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 5px;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.4);

    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;
