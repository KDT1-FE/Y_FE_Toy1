import { HasChildMap, Wiki } from "@/components/wiki/types/WikiCommonType";
import * as Styled from "./WikiCategoryListStyle";
import ParentWikiItem from "./ParentWikiItem";
import ChildWikiItem from "./ChildWikiItem";

interface WikiCategoryListItemProps {
  wiki: Wiki;
  selectedWikiId: string | null;
  hasChildMap: HasChildMap;
  onArrowClick: (wiki: Wiki) => void;
  onEntryClick: (wiki: Wiki) => void;
  isUnfolded: (wikiId: string) => boolean;
}

const WikiCategoryListItem = (props: WikiCategoryListItemProps) => {
  const { wiki, onEntryClick } = props;

  return (
    <Styled.WikiItem onClick={() => onEntryClick(wiki)}>
      {wiki.parentID === "" ? (
        <ParentWikiItem {...props} />
      ) : (
        <ChildWikiItem wiki={wiki} selectedWikiId={props.selectedWikiId} />
      )}
    </Styled.WikiItem>
  );
};

export default WikiCategoryListItem;
