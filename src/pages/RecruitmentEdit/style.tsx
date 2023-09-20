import styled from 'styled-components';
export const RecruitmentPostContainer = styled.div`
    padding-top: 72px;
    height: 100vh;
    width: 100vw;

    overflow: auto;
    background-color: var(--mention-badge);
`;

export const PostContainer = styled.div`
    width: 100%;
    max-width: 1080px;
    height: auto;

    margin: 20px auto;
    background-color: white;

    padding: 20px;
`;

export const PostForm = styled.form`
    padding-top: 0;

    display: flex;
    flex-direction: column;
`;

export const PostBox = styled.div`
    border-bottom: 1px solid #eee;

    padding: 10px;
    margin-bottom: 10px;
`;

export const PostH = styled.p`
    font-size: 1.2rem;
    font-weight: 700;

    margin: 0;
    margin-bottom: 5px;
`;

export const PostTextarea = styled.textarea`
    width: 100%;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    border: solid 2px #1e90ff;
    border-radius: 5px;
    font-size: 16px;
    resize: both;
`;

export const PostBtn = styled.button`
    width: 100%;
    height: 50px;

    border-radius: 10px;
    border: none;

    font-size: 1.2rem;
    font-weight: 700;

    color: white;

    background-color: var(--active-item);

    &:hover {
        cursor: pointer;
    }
`;
