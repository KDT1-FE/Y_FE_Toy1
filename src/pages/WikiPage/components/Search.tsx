import React, { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil';
import { SearchContainer } from '../../../styled/WikiPage/Container';
import { TitleText } from '../../../styled/WikiPage/Text';
import  { Input } from '../../../styled/WikiPage/Input';
import searchKeywordState from '../../../recoil/atoms/wiki/SearchAtom';

export default function Search() {
  const [searchKeyword , setSearchKeyword] = useRecoilState(searchKeywordState);

  const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchKeyword(newValue);
  }
  return (
    <SearchContainer>
        <TitleText>SEARCH</TitleText>
        <Input 
        type='text' 
        placeholder='검색어를 입력하세요'
        value = {searchKeyword}
        onChange={handleInputChange} />
    </SearchContainer>
    
  )
}
