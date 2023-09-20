import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { Timestamp } from 'firebase/firestore';

interface loadingProps {
  data: any;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function WikiContent({ data, setIsEdit }: loadingProps) {
  const time = data?.writeTime as Timestamp;
  const documentWritedTime = time?.toDate().toString();

  return (
    <>
      {data === undefined ? (
        <div>
          <h1>아직 작성된 글이 없습니다.</h1>
          <button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            글 작성하기
          </button>
        </div>
      ) : (
        <div>
          <StyledButtonContainer>
            <div>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                수정하기
              </button>
              <button>삭제하기</button>
            </div>
          </StyledButtonContainer>
          <p>최종 수정 시간: {documentWritedTime}</p>
          <br />
          <MDEditor.Markdown
            className="markdownViewer"
            source={data?.content}
          />
        </div>
      )}
    </>
  );
}
export default WikiContent;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 1rem;
  }
`;
