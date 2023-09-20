import styled from '@emotion/styled';

export const WikiContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: auto;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;
export const WikiContent = styled.div`
    display: flex;
    justify-content: left;
    margin-left: 0px;
    position: relative;
    width: 100%;
    height: calc(100vh - 72px);
    overflow: auto;
    padding: 10px 20px 20px 40px;
`;
export const ChannelNames = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
`;
export const EditCompletedButton = styled.div`
    display: absolute;
    border: none;
    margin-right: 70px;
    margin-left: 10px;
    font-weight: 500;
    font-size: 24px;
    color: var(--text);
`;
export const BeforeEdit = styled.div`
    display: absolute;
    border: none;
    position: left;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-weight: 500;
    font-size: 24px;
    color: var(--text);
`;
export const MDEditBtn = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    text-decoration: none;
    cursor: pointer;
    box-shadow: none;
    position: absolute;
    top: 20px;
    right: 30px;
    width: 50px;
    height: 30px;
`;
export const ReadChannel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 60vw;
    margin-right: 0px;
`;
