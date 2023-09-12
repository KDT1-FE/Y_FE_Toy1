import React from 'react'
import { SearchContainer } from '../../../styled/wiki/Container';
import { TitleText } from '../../../styled/wiki/Text';
import Input from '../../../styled/wiki/Input';

export default function Search() {
  return (
    <SearchContainer>
        <TitleText>SEARCH</TitleText>
        <Input type='text' placeholder='검색어를 입력하세요' />
    </SearchContainer>
    
  )
}
