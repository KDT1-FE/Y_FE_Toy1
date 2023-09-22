import * as Styled from "./WikiCategoryListStyle";
import { useState } from "react";
import {
  Wiki,
  WikiCategoryProps,
} from "@/components/wiki/types/WikiCommonType";
import WikiCategoryListItem from "./WikiCategoryListItem";

const WikiCategoryList = ({
  WiKiList,
  hasChildMap,
  onEntryClick,
  onArrowClick,
  isVisible,
}: WikiCategoryProps) => {
  const firstParentWikiId =
    WiKiList.find((wiki) => !wiki.parentID)?.wikiID || null;

  const [selectedWikiId, setSelectedWikiId] = useState<string | null>(
    firstParentWikiId,
  );

  const [unfoldedWikiIds, setUnfoldedWikiIds] = useState<string[]>([]);

  const handleArrowClick = (wiki: Wiki) => {
    if (unfoldedWikiIds.includes(wiki.wikiID)) {
      setUnfoldedWikiIds((prev) => prev.filter((id) => id !== wiki.wikiID));
    } else {
      setUnfoldedWikiIds((prev) => [...prev, wiki.wikiID]);
    }
    onArrowClick(wiki);
  };

  const handleEntryClickInternal = (wiki: Wiki) => {
    setSelectedWikiId(wiki.wikiID);
    onEntryClick(wiki);
  };

  const isUnfolded = (wikiId: string) => unfoldedWikiIds.includes(wikiId);

  return (
    <Styled.Wrapper $isVisible={isVisible}>
      <Styled.WikiList>
        {WiKiList.map((wiki) => (
          <WikiCategoryListItem
            key={wiki.wikiID}
            wiki={wiki}
            selectedWikiId={selectedWikiId}
            hasChildMap={hasChildMap}
            onArrowClick={handleArrowClick}
            onEntryClick={handleEntryClickInternal}
            isUnfolded={isUnfolded}
          />
        ))}
      </Styled.WikiList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;
