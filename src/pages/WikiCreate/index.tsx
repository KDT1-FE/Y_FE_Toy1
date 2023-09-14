import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react'

function WikiCreate() {
  const [textValue, setTextValue] = useState('')
  const [writable, setWriteToggle] = useState(false);
  
  const handleSetValue = (e: string) => {
    setTextValue(e);
  };

  const writeMode = () => {
    setWriteToggle(() => false)
  }
  const previewMode = () => {
    setWriteToggle(() => true)
  }

  return (
  <WikiContainer>
    <NavigationWiki></NavigationWiki>
    <TextareaContainer>
      <ButtonContainer>
        <div>
          <button onClick={writeMode}>Write</button><button onClick={previewMode}>Preview</button>
        </div>
        <button>등록하기</button>
      </ButtonContainer>
      {
        writable === false ? 
        <textarea 
          placeholder='내용을 입력하세요.'
          value={textValue}
          onChange={(e) => {handleSetValue(e.target.value)}}
        ></textarea> :
        <MDEditor.Markdown source={textValue} />
      }
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
  justify-content: space-between;
`;

const TextareaContainer = styled.div`
  margin: 2rem;

  textarea {
    width: 100%;
    height: 100%;
  }
`;

export default WikiCreate;