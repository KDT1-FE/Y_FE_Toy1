import { CategoryTitleSection, BreadCrumb } from '../Gallery/Project';
import { StyledImage, StyledContainer, StyledSpan } from './Figma';

const Notion = () => {
  return (
    <StyledContainer>
      <CategoryTitleSection>
        <h1>Notion</h1>
        <BreadCrumb>about &gt; 정보 &gt; notion</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.notion.so/i-b0512a32e6f1405a9cd5c5305691982d">
        <StyledImage src="../../../src/assets/notion.png" />
      </a>
      <StyledSpan>사진을 누르면 링크로 이동합니다.</StyledSpan>
    </StyledContainer>
  );
};

export default Notion;
