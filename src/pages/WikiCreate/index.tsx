import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react'
import { create } from 'apis/Wiki';
import { useNavigate, useLocation } from 'react-router-dom'

function WikiCreate() {
  const navigate = useNavigate()
  // create 페이지의 URL상에서 쿼리 파라미터(카테고리 정보)를 수집
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategory = searchParams.get('category')
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
          } else {
            // 빈 내용이 아닌 올바른 내용을 생성한 후, 위키 작성시 firebase api 호출을 통해 글 등록
            create(selectedCategory as string, textValue)
            navigate(`/wiki?category=${selectedCategory}`)  // 작성하고 나면, 작성한 카테고리의 Read 페이지로 이동
          }
        }}>등록하기</button>
      </ButtonContainer>
      {/* @uiw/react-md-editor 패키지의 기본 기능을 통해, 템플릿 내에서 실시간으로 
      작성한 텍스트를 마크다운 양식으로 보여줌 */}
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