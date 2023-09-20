import { CategoryTitleSection, BreadCrumb } from '../Gallery/Project';
import { StyledImage, StyledContainer, StyledSpan } from './Figma';

const Github = () => {
  return (
    <StyledContainer>
      <CategoryTitleSection>
        <h1>Github</h1>
        <BreadCrumb>about &gt; 정보 &gt; github</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.notion.so/i-b0512a32e6f1405a9cd5c5305691982d">
        <StyledImage src="../../../src/assets/notion.png" />
      </a>
      <StyledSpan>사진을 누르면 링크로 이동합니다.</StyledSpan>
    </StyledContainer>
  );
};

export default Github;
