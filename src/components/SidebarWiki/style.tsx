import styled from '@emotion/styled/macro';

export const AllChannelsWrapper = styled.div`
    height: 100%;
    min-width: 16.25%;
    padding-top: 1%;
    background-color: #3f0e40;
    color: #ffffffb3;
`;

export const ChannelWrapper = styled.div`
    padding-left: 10%;
`;

export const DropDownOptions = styled.div`
    background: #ffffff;
    border-radius: 8px;
    position: absolute;
    top: 10px;
    left: 95%;
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
    top: 10px;
    left: 95%;
    min-width: 40%;
    display: block;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    padding: 5px 0;
    z-index: 1;
`;

export const MoreHorizIconWrapper = styled.div`
    background-color: #4d2a51;
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
        background-color: #4d2a51;
        cursor: pointer;
    }
`;

export const ChannelHr = styled.hr`
    border: solid 1px #4d2a51;
`;

export const CreateChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    padding: 5px 0px 5px 10%;

    &:hover {
        background-color: #4d2a51;
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
        background-color: #1164a3;
        cursor: pointer;
        color: #ffffff;
    }
`;

export const ChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
`;

export const SubChannelDiv = styled.div`
    font-size: 1.15rem;
    font-weight: bold;
    padding: 5px;
`;
