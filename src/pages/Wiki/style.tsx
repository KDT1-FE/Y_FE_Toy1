import styled from 'styled-components';

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

    background-color: var(--mention-badge);
    width: 100%;
    padding: 20px 40px 20px 40px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--point-item);
        border-radius: 6px;
        border: 3px solid transparent;
    }
`;

export const EditCompletedButton = styled.div`
    display: absolute;
    border: none;
    margin-right: 70px;
    margin-left: 10px;
    font-weight: 500;
    font-size: 24px;
    color: ${(props) => props.theme.text};
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
    color: ${(props) => props.theme.text};


export const ChannelNames = styled.div`
    width: 100%;
`;
export const MDEditBtn = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 50px;
    height: 50px;
`;
export const ReadChannel = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid black;
    margin-bottom: 20px;
`;
