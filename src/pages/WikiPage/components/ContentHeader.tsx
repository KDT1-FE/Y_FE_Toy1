import React from 'react'
import { WikiContentHeaderContainer } from '../../../styled/WikiPage/Container';
import { ContentHeaderItem } from '../../../styled/WikiPage/Item';
import { DeleteBtn } from '../../../styled/WikiPage/Button';

export default function ContentHeader() {
  return (
    <WikiContentHeaderContainer>
      <input type="checkbox"/>
      <ContentHeaderItem>전체선택</ContentHeaderItem>
      <DeleteBtn type='button'>삭제</DeleteBtn>
    </WikiContentHeaderContainer>
  )
}
