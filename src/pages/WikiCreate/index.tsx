import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react'

function WikiCreate() {
  const [textValue, setTextValue] = useState('')  
  const handleSetValue = (text: string) => {
    setTextValue(text);
  };

  return (
  <WikiContainer>
    <NavigationWiki></NavigationWiki>
    <TextareaContainer>
      <ButtonContainer>
        <button onClick={() => {
          if (textValue === '') {
            alert('빈 내용은 등록하실 수 없습니다.')
            return;
          }
        }}>등록하기</button>
      </ButtonContainer>
      <MDEditor 
        placeholder='등록할 내용을 입력해주세요.'
        value={textValue}
        onChange={(event) => {handleSetValue(event as string)}}
      /> 
    </TextareaContainer>
  </WikiContainer>
  )
}

const WikiContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TextareaContainer = styled.div`
  margin: 2rem;

`;

export default WikiCreate;