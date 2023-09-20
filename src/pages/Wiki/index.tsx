import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';
import { create, read } from 'apis/Wiki';
import { useLocation } from 'react-router-dom';
// import { Timestamp } from 'firebase/firestore';
import { media } from 'styles/media';
import Loading from 'components/Common/Loading';
import WikiContent from 'components/Wiki/'


interface createProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface updateProps {
//   setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
// }

function WikiCreate({ setIsEdit }: createProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let selectedCategory = searchParams.get('category');
  if (selectedCategory === null) selectedCategory = 'companyRule';
  const [textValue, setTextValue] = useState('');
  const handleSetValue = (text: string) => {
    if (text) {
      setTextValue(text);
    }
  };

  return (
    <StyledTextareaContainer>
      <ButtonContainer>
        <button
          onClick={() => {
            if (textValue === '') {
              alert('빈 내용은 등록하실 수 없습니다.');
              return;
            }
            create(selectedCategory as string, textValue);
            setIsEdit(false);
          }}
        >
          등록하기
        </button>
      </ButtonContainer>
      <MDEditor
        placeholder="등록할 내용을 입력해주세요."
        value={textValue}
        onChange={(event) => {
          handleSetValue(event as string);
        }}
        id="markdownEditor"
      />
    </StyledTextareaContainer>
  );
}

// function WikiUpdate({ setIsUpdate }: updateProps) {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   let selectedCategory = searchParams.get('category');
//   if (selectedCategory === null) selectedCategory = 'companyRule';
//   const [textValue, setTextValue] = useState('');
//   const handleSetValue = (text: string) => {
//     if (text) {
//       setTextValue(text);
//     }
//   };

//   return (
//     <StyledTextareaContainer>
//       <ButtonContainer>
//         <button
//           onClick={() => {
//             if (textValue === '') {
//               alert('빈 내용은 등록하실 수 없습니다.');
//               return;
//             }
//             update(selectedCategory as string, textValue);
//             setIsUpdate(false);
//           }}
//         >
//           등록하기
//         </button>
//       </ButtonContainer>
//       <MDEditor
//         placeholder="등록할 내용을 입력해주세요."
//         value={textValue}
//         onChange={(event) => {
//           handleSetValue(event as string);
//         }}
//         id="markdownEditor"
//       />
//     </StyledTextareaContainer>
//   );
// }

function Wiki() {
  const [isEdit, setIsEdit] = useState(false);
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [isDocumentExist, setDocumentExist] = useState(false);
  const [data, setData] = useState(Object);
  // const [documentTime, setDocumentTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let selectedCategory = searchParams.get('category');
  if (selectedCategory === null) selectedCategory = 'companyRule';

  const getDocumentList = async () => {
    setIsLoading(true)
    const document = await read(selectedCategory as string);
    // document === undefined ? setDocumentExist(false) : setDocumentExist(true);
    setData(document);
    // const time = document?.writeTime as Timestamp;
    // if (time) {
    //   setDocumentTime(time.toDate().toString());
    // }
    setIsLoading(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      const documentData = await getDocumentList();
      return documentData;
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <StyledWikiContainer>
      <NavigationWiki></NavigationWiki>

      {isEdit === true ? (
        <WikiCreate setIsEdit={setIsEdit}></WikiCreate>
      ) : (
        <StyledTextareaContainer>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <WikiContent data={data} setIsEdit={setIsEdit} />
          )}
          {
            <></> /* {isDocumentExist === false ? (
            <StyledWikiNotExist>
              <h1>아직 등록된 글이 없습니다.</h1>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                + 글 작성하기
              </button>
            </StyledWikiNotExist>
          ) : (
            <div className="document">
              {isUpdate === true ? (
                <WikiUpdate setIsUpdate={setIsUpdate}></WikiUpdate>
              ) : (
                <div>
                  <ButtonContainer>
                    <div>
                      <button
                        onClick={() => {
                          setIsUpdate(true);
                        }}
                      >
                        수정하기
                      </button>
                      <button
                        onClick={() => {
                          wikiDelete(selectedCategory as string);
                        }}
                      >
                        삭제하기
                      </button>
                    </div>
                  </ButtonContainer>
                  <p>최종 수정 시간: {documentTime}</p>
                  <br />
                  <MDEditor.Markdown
                    className="markdownViewer"
                    source={data?.content}
                  />
                </div>
              )}
            </div>
          )} */
          }
        </StyledTextareaContainer>
      )}
    </StyledWikiContainer>
  );
}


const StyledWikiContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 1rem;
  }
`;

const StyledTextareaContainer = styled.div`
  margin: 2rem;
  position: relative;

  #markdownEditor {
    height: 100% !important;
  }

  .document {
    height: 100%;
  }

  .document .markdownViewer {
    height: 100%;
    overflow-y: scroll;
  }

  .document .markdownViewer::-webkit-scrollbar {
    display: none;
  }

  ${media.desktop_lg(`
    width: 35rem;
    height: 40rem; 
  `)}
  ${media.tablet(`
    width: 30rem;
    height: 35rem;
  `)}
  ${media.tablet_680(`
    width: 25rem;
    height: 35rem;
  `)}
  ${media.tablet_625(`
    width: 20rem;
    height: 30rem;
  `)}
  ${media.mobile_430(`
    width: 15rem;
    height: 25rem;
  `)}
`;

// const StyledWikiNotExist = styled.div`
//   font-size: 1.5rem;
//   font-weight: 600;
//   text-align: center;
//   position: absolute;

//   width: 100%;
//   height: 100%;
//   top: 50%;

//   button {
//     position: relative;
//     color: #3584f4;
//     font-size: 1rem;
//     text-align: right;
//     cursor: pointer;
//   }

//   ${media.desktop_lg(`
//     font-size: 1.5rem;
//   `)}
//   ${media.tablet(`
//     font-size: 1.25rem;
//   `)}
//   ${media.tablet_680(`
//     font-size: 1rem;
//   `)}
//   ${media.tablet_625(`
//     font-size: 0.75rem;
//   `)}
//   ${media.mobile_430(`
//     font-size: 0.5rem;
//   `)}
// `;

export default Wiki;
