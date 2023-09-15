import styled from 'styled-components';

const TitleText = styled.div`
    font-size : 14px;
    font-weight : bold;
    color : #666a73;
`;

const CategoryText = styled(TitleText)`
    color : #febd1a;

`
export const ItemTitleText = styled.div`
    font-size : 36px;
    font-weight : bold;
    letter-spacing : 2px;

`;

export const TimeTitleText = styled.div`
    font-size : 15px;
    font-weight : bold;
    color : #666a73;
    margin : 7px 0 30px 0;
`;

export const ItemCategoryText = styled(CategoryText)`
    font-size : 20px;
    margin : 10px 0;
`;
const ContentText = styled.div``;

export { TitleText , ContentText, CategoryText};