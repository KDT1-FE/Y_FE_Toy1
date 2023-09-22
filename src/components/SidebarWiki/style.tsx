import styled from 'styled-components';

export const AllChannelsWrapper = styled.div`
    min-width: 16.25%;
    max-width: 16.25%;
    padding-top: 1%;
    height: calc(100vh - 72px);

    background-color: ${(props) => props.theme.sideMenu};
    color: ${(props) => props.theme.text};
    overflow: auto;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ffffffb3;
        border-radius: 6px;
        border: 3px solid transparent;
    }
`;

export const ChannelWrapper = styled.div`
    padding-left: 10%;
`;

export const DropDownOptions = styled.div`
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 90%;
    left: 55%;
    min-width: 5rem;
    min-width: 40%;

    display: block;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    padding: 5px 0;
    z-index: 1;
`;

export const SubDropDownOptions = styled.div`
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 90%;
    left: 55%;
    min-width: 40%;
    display: block;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    padding: 5px 0;
    z-index: 1;
`;

export const MoreHorizIconWrapper = styled.div`
    background-color: ${(props) => props.theme.pointItem};
    padding: 1px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 5%;
    cursor: pointer;
`;

export const ChannelFlexDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1.4rem;
`;

export const SubChannelFlexDiv = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1.15rem;
    &:hover {
        background-color: ${(props) => props.theme.pointItem};
        cursor: pointer;
        & ${MoreHorizIconWrapper} {
            background-color: ${(props) => props.theme.sideMenu};
            color: ${(props) => props.theme.text};
        }
    }
`;

export const ChannelHr = styled.hr`
    border: solid 1px ${(props) => props.theme.pointItem};
`;

export const CreateChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    padding: 5px 0px 5px 10%;

    &:hover {
        background-color: ${(props) => props.theme.pointItem};
        cursor: pointer;
    }
`;

export const OptionButton = styled.button`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 1.2rem;
    border: none;
    background-color: #ffffff;

    &:hover {
        background-color: ${(props) => props.theme.activeColor1};
        cursor: pointer;
        color: #ffffff;
    }
`;

export const ChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const SubChannelDiv = styled.div`
    font-size: 1.15rem;
    font-weight: bold;
    padding: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
