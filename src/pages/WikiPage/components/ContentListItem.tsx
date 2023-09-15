import React from 'react'
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, collection, doc } from 'firebase/firestore';
import { ContentListItemContentContainer, ItemContainer } from '../../../styled/WikiPage/Container';
import { DeleteBtn, EditContentBtn } from '../../../styled/WikiPage/Button';
import {CategoryText, TitleText} from '../../../styled/WikiPage/Text';
import {db} from '../../../firebaseSDK';
import { wikiListState } from '../../../recoil/atoms/wiki/wikiListAtom';

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
    const [wikiList, setWikiList] = useRecoilState(wikiListState);

    const handleEditBtn = () => {
        navigate(`/wiki/edit?id=${item.id}`);

    }
    const handleItemClick = () => {
        navigate(`/wiki/content?id=${item.id}`);

    }
    const handleDeleteBtnClick = async () => {
        try {
            const wikiCollection = collection(db, "/wiki");
            const docRef = doc(wikiCollection, item.id);
            await deleteDoc(docRef);
            
            const updatedWikiList = wikiList.filter((wikiItem) => wikiItem.id !== item.id);
            setWikiList(updatedWikiList);
        }
        catch (err) {
            console.error('Error deleting item from Firebase', err);
        }


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
        <DeleteBtn type='button' onClick={handleDeleteBtnClick}>삭제</DeleteBtn>
    </ItemContainer>
    
  )
}
