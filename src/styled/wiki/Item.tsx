import styled from 'styled-components';

const CategoryItemContainer = styled.div`
    min-width: 180px;
    background-color : #e9ecef;
    padding : 10px;
    border-radius : 10px;
    margin-top : 10px;
    box-sizing : border-box;

`;



const CategoryContentItem = styled.div``;

const ContentHeaderItem = styled.div`
    flex-grow : 1;
    display : flex;
    align-items : start;
    padding-left : 10px;
`;

export {CategoryItemContainer , CategoryContentItem, ContentHeaderItem};