import * as Styled from "./WikiCategoryListStyle";
import { Wiki } from "@/pages/wiki/WikiType";

type Props = {
  WiKiList: Wiki[];

  onEntryClick: (entry: Wiki) => void;
  style?: React.CSSProperties;
};

const WikiCategoryList = ({
  WiKiList,
  onEntryClick,

  style,
}: Props) => {
  return (
    <Styled.Wrapper style={style}>
      <Styled.CategoryList>
        {WiKiList.map((Wiki) => (
          <Styled.CategoryItem
            key={Wiki.wikiID}
            onClick={() => onEntryClick(Wiki)}
          >
            <span>{Wiki.title}</span>
            {/* <Styled.EntryList>
              {category.entries.map((entry) => (
                <Styled.EntryItem
                  key={entry.title}
                  onClick={(event) => {
                    event.stopPropagation();
                    onEntryClick(entry);
                  }}
                >
                  <Styled.EntryContent>
                    <Styled.DepthSymbol></Styled.DepthSymbol>
                    <span>{entry.title}</span>
                  </Styled.EntryContent>
                </Styled.EntryItem>
              ))}
            </Styled.EntryList> */}
          </Styled.CategoryItem>
        ))}
      </Styled.CategoryList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;
