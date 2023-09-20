import styled from '@emotion/styled/macro';

export const AllChannelsWrapper = styled.div`
    height: calc(100vh - 72px);
    min-width: 16.25%;
    max-width: 16.25%;
    padding-top: 1%;
    background-color: #3f0e40;
    color: #ffffffb3;
`;

export const ChannelWrapper = styled.div`
    padding-left: 10%;
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

export const ChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
`;

export const SubChannelDiv = styled.div`
    font-size: 1.15rem;
    font-weight: bold;
    padding: 5px;
`;
