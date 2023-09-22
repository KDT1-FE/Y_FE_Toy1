import styled from 'styled-components';


export const Container = styled.div`
    margin : 0;
    height : 100vh;
    
`;


export const RowContainer = styled.div`
    display : flex;
    flex-direction : row;
    gap : 30px;
    max-width : 1200px;
    margin : 50px auto;
    padding : 0 30px;
    height : 750px;
    
`;
export const HeaderContainer = styled.div`
    display : flex;
    justify-content : space-between;
    width : 100%;
    align-items : center;
    padding : 0 40px;
`;

export const ColumnContainer = styled.div`
    display : flex;
    flex-direction : column;
    background-color : rgba(150, 160, 255, 0.2);
    margin : 0 0;
`;

export const SearchContainer = styled.div`
    display : flex;
    flex-direction : column;
    padding : 10px 20px;
    min-width : 180px;
    margin : 20px 0;
    
`;

export const ContentContainer = styled.div`
    display : flex;
    flex-direction : column;
    flex-grow : 1;
    align-items : center;
    display : relative;
    
`;

export const CategoryHeaderContainer = styled.div`
    display : flex;
    justify-content : space-between;
    padding : 10px 20px;
    min-width : 180px;
    margin : 10px 0;
    background-color : rgba(150, 160, 255, 0.01);


`;

export const CategoryListContainer = styled.div`
display : flex;
    flex-direction : column;
    padding : 10px 20px;
    margin : 0;
    align-items : start;
    gap : 5px;

`;

export const WikiContentHeaderContainer = styled.div`
    display : flex;
    padding : 20px 20px;
    border : 2px solid #e9ecef;
    border-radius : 15px;
    max-width : 800px;
    width : 100%;
    margin : 10px 30px;
`;

export const ContentListItemContainer = styled.div`
    display : flex;
    padding : 30px 20px;
    border : 2px solid #e9ecef;
    border-radius : 15px;
    max-width : 800px;
    width : 100%;
    margin : 20px 0 ;
    gap : 10px;
    flex-direction :column;
    overflow-y :auto;
    

`;
export const ItemContainer = styled.div`
    display: flex;
    gap : 10px;
`;


export const ContentListItemContentContainer = styled.div`
    flex-grow : 1;
    display : flex;
    flex-direction : column;
    align-items : start;
    padding-left : 10px;
    gap : 10px;
`;


export const WikiWriteContainer = styled.div`
    max-width : 1000px;
    margin : 0 auto;
    overflow-y : auto;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
    gap : 20px;

`;

export const WikiWriteContentContainer = styled.div`
    display : flex;     
    flex-direction : column;
    width :100%;
    margin : 20px 0;
`;

export const WikiWriteBtnContainer = styled.div`
    display : flex;
    width : 700px;
    justify-content : space-between;

`;

export const WikiItemContainer = styled.div`
    display : flex;
    gap : 10px;
    margin : 20px auto;
    max-width : 700px;
    padding : 0 20px;
    flex-direction : column;
    min-height : 500px;
    align-items : start;
`;
