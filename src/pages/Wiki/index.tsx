import NavigationWiki from 'components/NavigationWiki';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { read } from 'apis/Wiki';
import { useLocation } from 'react-router-dom';
import { media } from 'styles/media';
import Loading from 'components/Common/Loading';
import WikiContent from 'components/Wiki/WikiContent';
import WikiCreate from 'components/Wiki/WikiCreate';
import { DocumentData } from 'firebase/firestore';

function Wiki() {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<DocumentData | undefined>();
  const [isChange, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(useLocation().search);
  let selectedCategory = searchParams.get('category');
  if (!selectedCategory) selectedCategory = 'companyRule';

  const getDocumentList = async () => {
    setIsLoading(true);
    if (!selectedCategory) return;
    const document = await read(selectedCategory);
    setData(document);
    setIsLoading(false);
  };

  useEffect(() => {
    getDocumentList();
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) setIsEdit(false);
    getDocumentList();
  }, [isChange]);

  return (
    <StyledWikiContainer>
      <NavigationWiki setIsChanged={setIsChanged} isChange={isChange} />
      <div>
        {isEdit ? (
          <WikiCreate
            setIsEdit={setIsEdit}
            data={data}
            selectedCategory={selectedCategory}
          />
        ) : (
          <StyledTextareaContainer>
            {isLoading ? (
              <Loading />
            ) : (
              <WikiContent
                data={data}
                setIsEdit={setIsEdit}
                setIsChanged={setIsChanged}
                isChange={isChange}
              />
            )}
          </StyledTextareaContainer>
        )}
      </div>
    </StyledWikiContainer>
  );
}

const StyledWikiContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
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
