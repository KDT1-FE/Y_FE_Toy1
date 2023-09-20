import styled from '@emotion/styled/macro';

export const AllChannelsWrapper = styled.div`
    height: 100%;
    min-width: 16.25%;
    max-width: 16.25%;
    padding-top: 1%;
    background-color: #3f0e40;
    color: #ffffffb3;
`;

export const ChannelWrapper = styled.div`
    padding-left: 10%;
`;

export const ChannelDiv = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    position: relative;
`;

export const SubChannelDiv = styled.div`
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px;
    &:hover {
        background-color: #4d2a51;
        cursor: pointer;
    }
`;

export const ChannelHr = styled.hr`
    border: solid 1px #4d2a51;
`;
