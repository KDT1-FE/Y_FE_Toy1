import React from 'react'
import { WikiContentHeaderContainer } from '../../../styled/wiki/Container';
import { ContentHeaderItem } from '../../../styled/wiki/Item';
import { DeleteBtn } from '../../../styled/wiki/Button';

export default function ContentHeader() {
  return (
    <WikiContentHeaderContainer>
      <input type="checkbox"/>
      <ContentHeaderItem>전체선택</ContentHeaderItem>
      <DeleteBtn type='button'>삭제</DeleteBtn>
    </WikiContentHeaderContainer>
  )
}
