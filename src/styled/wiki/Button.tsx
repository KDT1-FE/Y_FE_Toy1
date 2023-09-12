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
    height : 29px;
    padding : 7px 20px;
    border : 0;
    color : white;
    width : 78px;

`;


export {  CateEditBtn,EditContentBtn, DeleteBtn};
