import React from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { useRecoilValue, selector } from 'recoil'
import { WikiItemContainer } from '../../styled/wiki/Container'
import { ItemTitleText, TimeTitleText,ItemCategoryText } from '../../styled/wiki/Text'
import { wikiListState } from '../../recoil/atoms/wiki/wikiListAtom'
import { BackToListBtn } from '../../styled/wiki/Button'

// wikiListState atom을 변환하는 selector 정의
export const selectedItemSelector = selector({
  key: 'selectedItem',
  get: ({get}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    
    const wikiList = get(wikiListState);

    return wikiList.find(item => item.id === id) || null;
  },
});


export default function ItemContent() {
    const navigate = useNavigate();

    const selectedItem = useRecoilValue(selectedItemSelector);
    
    const handleBackBtnClick = () => {
        navigate(-1);

    }
    
  return (
    <>
        <WikiItemContainer>
            <ItemCategoryText>{selectedItem ? selectedItem.category : "Category"}</ItemCategoryText>
            <ItemTitleText>{selectedItem ? selectedItem.title : "Title"}</ItemTitleText>
            <TimeTitleText>{selectedItem ? selectedItem.createdAt : "Timestamp"}</TimeTitleText>
            <MDEditor.Markdown
                source={selectedItem ? selectedItem.content : ""}
            />
        </WikiItemContainer>
        <BackToListBtn type='button' onClick={handleBackBtnClick} >목록으로</BackToListBtn>
    </>
    
  )
}

