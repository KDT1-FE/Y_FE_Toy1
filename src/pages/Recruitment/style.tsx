import styled from '@emotion/styled';

export const RecruitmentContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;
`;

export const PostsContainer = styled.div`
    background-color: var(--mention-badge);
    width: 100vw;
    height: 100%;

    overflow: auto;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PostNav = styled.div`
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const PostButton = styled.button`
    background-color: var(--active-item);
    color: var(--text);
    padding: 5px 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    font-size: 1.3rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

export const SearchInput = styled.input`
    min-width: 250px;
    padding: 7.5px 0px 5px 12.5px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
`;

export const PostsWrapper = styled.div`
    background-color: var(--text);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
`;

export const PostWrapper = styled.div`
    width: 50vw;
    /* min-height: 60vh; */
    padding: 20px 15px;

    &:hover {
        background-color: #bfefff;
        cursor: pointer;
    }
`;

export const Category = styled.div`
    background-color: var(--point-item);
    color: var(--text);
    padding: 2px 5px;
    border-radius: 5px;
`;

export const People = styled.div`
    background-color: var(--point-item);
    color: var(--text);
    padding: 2px 5px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const RecruitValued = styled.div<{ isRecruitCompleted: boolean }>`
    background-color: ${(props) => (props.isRecruitCompleted ? 'gray' : 'var(--active-current-status)')};
    color: var(--text);
    font-weight: bold;
    padding: 2px 5px;
    margin-right: 10px;
    border-radius: 5px;
`;

export const Title = styled.div`
    color: black;
    font-weight: bold;
    font-size: 1.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const Time = styled.div`
    color: black;
`;
