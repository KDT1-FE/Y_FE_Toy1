import styled from 'styled-components';


const Container = styled.div`
    margin : 0;
    height : 100vh;
`;


const RowContainer = styled.div`
    display : flex;
    flex-direction : row;
    gap : 30px;
    max-width : 1200px;
    margin : 30px auto;
    padding : 0 30px;
    background-color : rgba(150, 160, 255, 0.2);
    height : 100vh;
`;


const ColumnContainer = styled.div`
    display : flex;
    flex-direction : column;
    background-color : white;
    align-items : start;
    margin-top : 20px;
`;

const SearchContainer = styled(ColumnContainer)`
    padding : 10px 20px;
    min-width : 180px;
`;

const ContentContainer = styled(ColumnContainer)`
    flex-grow : 1;
    align-items : center;
    
`;

const CategoryHeaderContainer = styled.div`
    display : flex;
    justify-content : space-between;
    padding : 10px 20px;
    min-width : 180px;
    background-color : white;
    margin-top : 10px;


`;

const CategoryListContainer = styled(ColumnContainer)`
    padding : 10px 20px;
    background-color : white;
    margin-top : 0;

`;

const WikiContentHeaderContainer = styled.div`
    display : flex;
    padding : 20px 20px;
    border : 2px solid #e9ecef;
    border-radius : 15px;
    max-width : 800px;
    width : 100%;
    margin : 10px 30px;
`;

const ContentListItemContainer = styled.div`
    display : flex;
    padding : 30px 20px;
    border : 2px solid #e9ecef;
    border-radius : 15px;
    max-width : 800px;
    width : 100%;
    margin : 10px 30px;
    gap : 5px;

`;
const ContentListItemContentContainer = styled.div`
    flex-grow : 1;
    display : flex;
    flex-direction : column;
    align-items : start;
    padding-left : 10px;
    gap : 10px;
`;


export {Container,RowContainer, ColumnContainer, SearchContainer, CategoryHeaderContainer, CategoryListContainer,WikiContentHeaderContainer,ContentContainer,ContentListItemContainer,ContentListItemContentContainer};