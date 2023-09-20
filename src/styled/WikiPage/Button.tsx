import styled from 'styled-components';

const Btn = styled.button`
    font-size : 12px;
    padding : 10px 5px;
    border-radius : 5px;
`;

const CateEditBtn = styled(Btn)`
    background-color : #3B404B;
    color : white;
    padding : 5px 10px;

`;

const EditContentBtn = styled(Btn)`
    color : #febd1a;;
    border : 1px solid #febd1a;;
    background-color : white;
    padding : 7px 10px;
    height : 29px;
    margin : auto 0;
    font-weight : 500;
`;


const DeleteBtn = styled(Btn)`
    color : red;
    border : 1px solid red;
    background-color : white;
    padding : 7px 10px;
    height : 29px;
    margin : auto 0;
    font-weight : 500;


`;

export const SubmitButton = styled(Btn)`
    background-color : #96A0FF;
    padding : 10px 40px;
    border : 0;
    color : white;
    margin: 30px 0;

`;

export const EditBackToListBtn = styled(Btn)`
    background-color : #96A0FF;
    padding : 10px 40px;
    border : 0;
    color : white;
    margin: 30px 0;

`;

export const AddBtn = styled(Btn)`
    background-color : #484AAD;
    color : white;
    padding : 0 30px;
    position : relative;
    font-weight : 500;
    border : 0;
    height : 40px;

`;
export const BackToListBtn = styled(Btn)`
    background-color : #96A0FF;
    padding : 10px 40px;
    border : 0;
    color : white;
    margin: 30px auto;
    position : absolute;
    left : 50%;

`;
export const WriteBackToListBtn = styled(Btn)`
    background-color : #96A0FF;
    padding : 10px 40px;
    border : 0;
    color : white;
    margin: 30px 0;

`;



export {  CateEditBtn,EditContentBtn, DeleteBtn};
