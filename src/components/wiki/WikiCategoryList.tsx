import * as Styled from "./WikiCategoryListStyle";

type WikiEntry = {
  title: string;
  content: string;
  authorName: string;
  updatedAt: string;
};

type WikiCategory = {
  categoryName: string;
  entries: WikiEntry[];
};

type Props = {
  data: WikiCategory[];
  onEntryClick: (entry: WikiEntry) => void;
  style?: React.CSSProperties;
};

const WikiCategoryList = ({ data, onEntryClick, style }: Props) => {
  return (
    <Styled.Wrapper style={style}>
      <Styled.CategoryList>
        {data.map((category) => (
          <Styled.CategoryItem key={category.categoryName}>
            <span>{category.categoryName}</span>
            <Styled.EntryList>
              {category.entries.map((entry) => (
                <Styled.EntryItem
                  key={entry.title}
                  onClick={() => onEntryClick(entry)}
                >
                  <Styled.EntryContent>
                    <Styled.DepthSymbol></Styled.DepthSymbol>
                    <span>{entry.title}</span>
                  </Styled.EntryContent>
                </Styled.EntryItem>
              ))}
            </Styled.EntryList>
          </Styled.CategoryItem>
        ))}
      </Styled.CategoryList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;
