import * as Styled from "./WikiContentStyle";
import WikiEditButton from "./WikiButton";
import { RenderWikiContentProps } from "./WikiCommonType";
import { MarkdownViewer } from "./MarkdownViewer";
import formatDateToCustomFormat from "@/utils/formatDateToCustomFormat";
import convertTimestampToDate from "@/utils/convertTimestampToDate";

export default function RenderWikiContent({
  Wiki,
  onWikiEditButtonClick,
  onWikiDeleteButtonClick,
  toggleEditMode,
}: RenderWikiContentProps) {
  function onEditButtonClick() {
    onWikiEditButtonClick();
    toggleEditMode();
  }
  const createdAtDate = Wiki?.createdAt
    ? convertTimestampToDate(Wiki.createdAt)
    : null;
  const formattedCreatedAt = createdAtDate
    ? formatDateToCustomFormat(createdAtDate, "yyyy.dd.MM HH:mm:ss")
    : "";

  const updatedAtDate = Wiki?.updatedAt
    ? convertTimestampToDate(Wiki.updatedAt)
    : null;
  const formattedUpdatedAt = updatedAtDate
    ? formatDateToCustomFormat(updatedAtDate, "yyyy.dd.MM HH:mm:ss")
    : "";

  return (
    <>
      <Styled.ContentsTitle>
        <Styled.TitleText>{Wiki?.title}</Styled.TitleText>
        <div>
          {Wiki?.updatedAt
            ? `최종수정일: ${formattedUpdatedAt}`
            : `작성일: ${formattedCreatedAt}`}
          <Styled.EditDetails>
            {Wiki?.lastUpdatedBy
              ? `최종수정자: ${Wiki?.lastUpdatedBy}`
              : `작성자: ${Wiki?.authorID}`}
          </Styled.EditDetails>
          <WikiEditButton
            text={"수정"}
            padding={"0.38rem 0.69rem"}
            margin={"0 0.31rem 0 0"}
            onClick={onEditButtonClick}
          ></WikiEditButton>
          <WikiEditButton
            text={"삭제"}
            padding={"0.38rem 0.69rem"}
            onClick={onWikiDeleteButtonClick}
          ></WikiEditButton>
        </div>
      </Styled.ContentsTitle>

      <div>
        <MarkdownViewer
          key={Wiki?.wikiID}
          content={Wiki?.content}
        ></MarkdownViewer>
      </div>
    </>
  );
}
