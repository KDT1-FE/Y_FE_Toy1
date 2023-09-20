import RenderNoWiki from "./RenderNoWiki";
import RenderWikiContent from "./RenderWikiContent";
import RenderWikiForm from "./RenderWikiForm";
import * as Styled from "./WikiContentStyle";
import { WikiContentProps } from "@/components/wiki/WikiCommonType";

export default function WikiContent({
  currentUser,
  WiKiList,
  Wiki,
  form,
  parents,
  isEditMode,
  isLoading,
  editorRef,
  toggleEditMode,
  onFormChange,
  onWikiEditButtonClick,
  onWikiDeleteButtonClick,
}: WikiContentProps) {
  const wikiFormProps = {
    WiKiList,
    form,
    editorRef,
    parents,
    onFormChange,
  };
  const wikiContentProps = {
    Wiki,
    onWikiEditButtonClick,
    onWikiDeleteButtonClick,
    toggleEditMode,
  };

  if (isLoading) {
    return <Styled.ContentsWrapper>Loading...</Styled.ContentsWrapper>;
  }

  return (
    <Styled.ContentsWrapper>
      {isEditMode ? (
        <RenderWikiForm {...wikiFormProps}></RenderWikiForm>
      ) : Wiki === null ? (
        <RenderNoWiki />
      ) : (
        <RenderWikiContent
          {...wikiContentProps}
          currentUser={currentUser}
        ></RenderWikiContent>
      )}
    </Styled.ContentsWrapper>
  );
}
