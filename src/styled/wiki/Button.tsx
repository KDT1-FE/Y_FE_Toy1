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
    height : 36px;
    padding : 10px 0px;
    border : 0;
    color : white;
    width : 78px;
    margin-top: 30px;

`;

export const AddBtn = styled(Btn)`
    background-color : #484AAD;
    color : white;
    padding : 10px 15px;
    margin : 20px 0 0 800px;
    position : relative;
    left : 0;
    font-weight : 500;
    border : 0;
    

`;


export {  CateEditBtn,EditContentBtn, DeleteBtn};
