import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../common/config';
import imageSrc from '../../assets/figma.png';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { SubPageContainer } from '../../utils/CommonDesign';

export const StyledImage = styled.img`
  width: 60%;
  padding-top: 10px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const StyledSpan = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: gray;
`;

const Figma = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(storage, 'png/figma.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SubPageContainer>
      <CategoryTitleSection>
        <CategoryTitle>Figma</CategoryTitle>
        <BreadCrumb>about &gt; 정보 &gt; figma</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.figma.com/file/MokbPAUs2FpKGMwDgAnfzk/Untitled?type=design&node-id=0-1&mode=design&t=VJNm1SjjrWKzgKyJ-0">
        <StyledImage src={imageUrl ? imageUrl : imageSrc} />
      </a>
      <StyledSpan>사진을 누르면 figma(UI) 링크로 이동합니다.</StyledSpan>
    </SubPageContainer>
  );
};

export default Figma;
