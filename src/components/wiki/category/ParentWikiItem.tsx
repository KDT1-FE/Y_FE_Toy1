import { HasChildMap, Wiki } from "@/components/wiki/types/WikiCommonType";
import * as Styled from "./WikiCategoryListStyle";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/Io";

interface ParentWikiItemProps {
  wiki: Wiki;
  selectedWikiId: string | null;
  hasChildMap: HasChildMap;
  onArrowClick: (wiki: Wiki) => void;
  isUnfolded: (wikiId: string) => boolean;
}

const ParentWikiItem = ({
  wiki,
  selectedWikiId,
  hasChildMap,
  onArrowClick,
  isUnfolded,
}: ParentWikiItemProps) => (
  <Styled.ParentWikiWrapper>
    <Styled.WikiTitle selected={wiki.wikiID === selectedWikiId}>
      {wiki.title}
    </Styled.WikiTitle>
    {hasChildMap[wiki.wikiID] && (
      <Styled.ArrowIcon onClick={() => onArrowClick(wiki)}>
        {isUnfolded(wiki.wikiID) ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </Styled.ArrowIcon>
    )}
  </Styled.ParentWikiWrapper>
);

export default ParentWikiItem;
