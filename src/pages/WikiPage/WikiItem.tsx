import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useRecoilValue } from 'recoil'; // useRecoilValue 추가
import { wikiListState } from '../../recoil/atoms/wiki/wikiListAtom';
import { WikiItemContainer } from '../../styled/WikiPage/Container';
import { ItemTitleText, TimeTitleText, ItemCategoryText } from '../../styled/WikiPage/Text';
import { BackToListBtn } from '../../styled/WikiPage/Button';

export default function WikiItem() {
  const wikiList = useRecoilValue(wikiListState); // wikiListState의 값을 가져옴

  // URL에서 id 파라미터 가져오기
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  // id에 해당하는 항목 찾기
  const selectedItem = wikiList.find(item => item.id === id);

  const handleBackBtnClick = () => {
    window.history.back(); // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
  }

  return (
    <>
      <WikiItemContainer>
        <ItemCategoryText>{selectedItem ? selectedItem.category : "Category"}</ItemCategoryText>
        <ItemTitleText>{selectedItem ? selectedItem.title : "Title"}</ItemTitleText>
        <TimeTitleText>{selectedItem ? selectedItem.createdAt : "Timestamp"}</TimeTitleText>
        <MDEditor.Markdown
          style={{width : '700px'}}
          source={selectedItem ? selectedItem.content : ""}
        />
      </WikiItemContainer>
      <BackToListBtn type='button' onClick={handleBackBtnClick}>목록으로</BackToListBtn>
    </>
  )
}
