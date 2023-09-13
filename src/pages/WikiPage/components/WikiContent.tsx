import React from 'react'
import { useNavigate } from 'react-router-dom';
import ContentList from './ContentList'
import ContentHeader from './ContentHeader'
import { ContentContainer  } from '../../../styled/wiki/Container'
import { AddBtn } from '../../../styled/wiki/Button'

export default function WikiContent() {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/write');
    }
  return (
    <ContentContainer>
      <AddBtn type='button' onClick={handleButtonClick}>추가하기</AddBtn>
      <ContentHeader />
      <ContentList />

    </ContentContainer>
  )
}
