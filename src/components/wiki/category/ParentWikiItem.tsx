import { HasChildMap, Wiki } from "@/components/wiki/types/WikiCommonType";
import * as Styled from "./WikiCategoryListStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
        {isUnfolded(wiki.wikiID) ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </Styled.ArrowIcon>
    )}
  </Styled.ParentWikiWrapper>
);

export default ParentWikiItem;
