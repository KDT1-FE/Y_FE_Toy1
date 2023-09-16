import styled from 'styled-components';

export const CloseButton = styled.button`
    font-size: 1.5rem;
    padding: 0 10px;
    margin-left: auto;
    border: none;
    border-radius: 5px;
    background-color: #ffffff;
    &:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }
`;

export const ModalTitle = styled.div`
    font-weight: bold;
    font-size: 1.7rem;
`;

export const FallbackButton = styled.button`
    background-color: #ffffff;
    color: black;
    border: 0.5px solid black;
    height: 13.5%;
    width: 15%;
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid gray;
    border-radius: 5px;
    margin-top: 7%;
    margin-left: 65%;
    &:hover {
        cursor: pointer;
    }
`;

export const CreateButton = styled.button`
    background-color: #2bac76;
    color: #ffffff;
    border: none;
    height: 13.5%;
    width: 15%;
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid gray;
    border-radius: 5px;
    margin-top: 7%;
    margin-left: 1rem;
    &:hover {
        cursor: pointer;
    }
`;

export const TextInput = styled.input`
    height: 3rem;
    width: 100%;
    font-size: 1.1rem;
    &:hover {
        box-shadow: 0px 0px 7px 2px #1164a3;
    }
`;
