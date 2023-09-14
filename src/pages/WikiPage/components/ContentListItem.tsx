import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ContentListItemContentContainer, ItemContainer } from '../../../styled/wiki/Container';
import { DeleteBtn, EditContentBtn } from '../../../styled/wiki/Button';
import {CategoryText, TitleText} from '../../../styled/wiki/Text';

interface WikiListItem {
    id : string,
    category : string,
    title: string,
    content: string,
    createdAt :string
  };
interface WikiItemProps {
    item : WikiListItem;
};

export default function ContentListItem({item} : WikiItemProps) {
    const navigate = useNavigate();

    const handleEditBtn = () => {
        navigate(`/wiki/write?id=${item.id}`);

    }
    const handleItemClick = () => {
        navigate(`/wiki/content?id=${item.id}`);

    }

    return (
    <ItemContainer >
    <input type="checkbox"/>
        <ContentListItemContentContainer onClick={handleItemClick}>
            <CategoryText>{item.category}</CategoryText>
            <TitleText>{item.title}</TitleText>
            <TitleText>작성일 : {item.createdAt}</TitleText>
        </ContentListItemContentContainer>
        <EditContentBtn type='button' onClick={handleEditBtn}>수정</EditContentBtn>
        <DeleteBtn type='button'>삭제</DeleteBtn>
    </ItemContainer>
    
  )
}
