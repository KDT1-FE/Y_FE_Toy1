import React from 'react'
import { ContentListItemContentContainer } from '../../../styled/wiki/Container';
import { DeleteBtn, EditContentBtn } from '../../../styled/wiki/Button';
import {CategoryText, TitleText} from '../../../styled/wiki/Text';
/*
import { useRecoilState } from 'recoil';
import { wikiListState } from '../../../recoil/atoms/wiki/wikiListAtom';
const [wikiList, setWikiList] = useRecoilState(wikiListState);
const index : number | undefined = wikiList.findIndex((listItem) => listItem === item);
*/

export default function ContentListItem() {

  

    return (
    <>
    <input type="checkbox"/>
        <ContentListItemContentContainer>
            <CategoryText>주요 기능</CategoryText>
            <TitleText>편집은 어떻게 사용하나요?</TitleText>
            <TitleText>작성일 : 2023-09-09</TitleText>
        </ContentListItemContentContainer>
        <EditContentBtn type='button'>수정</EditContentBtn>
        <DeleteBtn type='button'>삭제</DeleteBtn>
    </>
    
  )
}
