import styled from 'styled-components';

const CategoryItemContainer = styled.div`
    width: 180px;
    background-color : #e9ecef;
    padding : 10px 10px 10px 20px;
    border-radius : 10px;
    margin-top : 10px;
    box-sizing : border-box;
    text-align : start;
    justify-content : start;
    gap : 10px;
    display : flex;
    font-size : 14px;
    align-items : center;

`;

const CategoryContentItem = styled.div``;

const ContentHeaderItem = styled.div`
    flex-grow : 1;
    display : flex;
    align-items : start;
    padding-left : 10px;
`;

export {CategoryItemContainer , CategoryContentItem, ContentHeaderItem};