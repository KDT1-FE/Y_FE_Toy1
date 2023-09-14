import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';

function WikiCreate() {
  return (
  <WikiContainer>
    <NavigationWiki></NavigationWiki>
    <TextareaContainer>
      <ButtonContainer>
        <div>
          <button>Write</button><button>Preview</button>
        </div>
        <button>등록하기</button>
      </ButtonContainer>
      <textarea placeholder='내용을 입력하세요.'></textarea>
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