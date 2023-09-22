import * as Styled from "./WikiCategoryListStyle";
import { useState } from "react";
import { Wiki, WikiCategoryProps } from "@/components/wiki/WikiCommonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <Styled.Wrapper $isVisible={isVisible}>
      <Styled.WikiList>
        {WiKiList.map((wiki) => (
          <Styled.WikiItem
            key={wiki.wikiID}
            onClick={() => handleEntryClickInternal(wiki)}
          >
            {wiki.parentID === "" ? (
              <Styled.ParentWikiWrapper>
                <Styled.WikiTitle selected={wiki.wikiID === selectedWikiId}>
                  {wiki.title}
                </Styled.WikiTitle>
                {hasChildMap[wiki.wikiID] && (
                  <Styled.ArrowIcon onClick={() => handleArrowClick(wiki)}>
                    {unfoldedWikiIds.includes(wiki.wikiID) ? (
                      <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowDown} />
                    )}
                  </Styled.ArrowIcon>
                )}
              </Styled.ParentWikiWrapper>
            ) : (
              <>
                <Styled.DepthSymbol />
                <Styled.ChildWikiTitle
                  selected={wiki.wikiID === selectedWikiId}
                >
                  {wiki.title}
                </Styled.ChildWikiTitle>
              </>
            )}
          </Styled.WikiItem>
        ))}
      </Styled.WikiList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;
