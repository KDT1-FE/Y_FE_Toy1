import * as Styled from "./WikiCategoryListStyle";
import { useState } from "react";
import { Wiki } from "@/pages/wiki/WikiType";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/Io";

type Props = {
  WiKiList: Wiki[];
  onEntryClick: (entry: Wiki) => void;
  onArrowClick: (entry: Wiki) => void;
  style?: React.CSSProperties;
};

const WikiCategoryList = ({
  WiKiList,
  onEntryClick,
  onArrowClick,
  style,
}: Props) => {
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
    <Styled.Wrapper style={style}>
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
                <Styled.ArrowIcon onClick={() => handleArrowClick(wiki)}>
                  {unfoldedWikiIds.includes(wiki.wikiID) ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </Styled.ArrowIcon>
              </Styled.ParentWikiWrapper>
            ) : (
              <>
                <Styled.DepthSymbol />
                <Styled.WikiTitle selected={wiki.wikiID === selectedWikiId}>
                  {wiki.title}
                </Styled.WikiTitle>
              </>
            )}
          </Styled.WikiItem>
        ))}
      </Styled.WikiList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;
