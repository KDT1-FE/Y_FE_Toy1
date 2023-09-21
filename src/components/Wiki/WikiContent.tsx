import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { DocumentData } from 'firebase/firestore';
import { wikiDelete } from 'apis/Wiki/index';
import { media } from 'styles/media';
import { dayFormat } from 'utils/format';

interface loadingProps {
  data: DocumentData | undefined;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isChange: boolean;
}

function WikiContent({
  data,
  setIsEdit,
  setIsChanged,
  isChange,
}: loadingProps) {
  const documentWritedTime = dayFormat(data?.writeTime?.toDate());

  return (
    <StyledWikiContentContainer>
      {data === undefined ? (
        <StyledWikiNotExist>
          <h1>아직 작성된 글이 없습니다.</h1>
          <button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            + 글 작성하기
          </button>
        </StyledWikiNotExist>
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
              <button
                onClick={async () => {
                  await wikiDelete(data?.subject);
                  setIsChanged(!isChange);
                }}
              >
                삭제하기
              </button>
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
    </StyledWikiContentContainer>
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

const StyledWikiContentContainer = styled.div`
  height: 100%;
`;

const StyledWikiNotExist = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  top: 50%;

  button {
    position: relative;
    color: #3584f4;
    font-size: 1rem;
    text-align: right;
    cursor: pointer;
  }

  ${media.desktop_lg(`
    font-size: 1.25rem;
  `)}
  ${media.tablet(`
    font-size: 1.25rem;
  `)}
  ${media.tablet_680(`
    font-size: 1rem;
  `)}
  ${media.tablet_625(`
    font-size: 0.875rem;
  `)}
  ${media.mobile_430(`
    font-size: 0.75rem;
  `)}
`;
