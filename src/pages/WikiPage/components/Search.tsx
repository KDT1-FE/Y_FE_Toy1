import React from 'react'
import { SearchContainer } from '../../../styled/WikiPage/Container';
import { TitleText } from '../../../styled/WikiPage/Text';
import  { Input } from '../../../styled/WikiPage/Input';

export default function Search() {
  return (
    <SearchContainer>
        <TitleText>SEARCH</TitleText>
        <Input type='text' placeholder='검색어를 입력하세요' />
    </SearchContainer>
    
  )
}
