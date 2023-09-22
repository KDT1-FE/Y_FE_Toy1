import { Wiki } from "@/components/wiki/types/WikiCommonType";
import * as Styled from "./WikiCategoryListStyle";

interface ChildWikiItemProps {
  wiki: Wiki;
  selectedWikiId: string | null;
}

const ChildWikiItem = ({ wiki, selectedWikiId }: ChildWikiItemProps) => (
  <>
    <Styled.DepthSymbol />
    <Styled.ChildWikiTitle selected={wiki.wikiID === selectedWikiId}>
      {wiki.title}
    </Styled.ChildWikiTitle>
  </>
);

export default ChildWikiItem;
