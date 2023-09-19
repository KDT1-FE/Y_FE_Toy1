import styled from '@emotion/styled';

export const WikiContainer = styled.div`
    display: flex;
    padding-top: 72px;
    height: 100vh;
    width: 100vw;
`;
export const WikiContent = styled.div`
    display: flex;
    justify-content: center;
    margin-left: 0px;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;
export const ChannelNames = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 90px;
    margin-top: 20px;
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
    position: center;
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
