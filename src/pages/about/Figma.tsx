import styled from 'styled-components';
import { CategoryTitleSection, BreadCrumb } from '../Gallery/Project';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../common/config';
import imageSrc from '../../assets/figma.png';

export const StyledImage = styled.img`
  width: 60%;
  padding-top: 10px;
`;

export const StyledContainer = styled.div`
  padding: 10px 30px 30px;
  width: 100%;
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
    <StyledContainer>
      <CategoryTitleSection>
        <h1>Figma</h1>
        <BreadCrumb>about &gt; 정보 &gt; figma</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.figma.com/file/MokbPAUs2FpKGMwDgAnfzk/Untitled?type=design&node-id=0-1&mode=design&t=VJNm1SjjrWKzgKyJ-0">
        <StyledImage src={imageUrl ? imageUrl : imageSrc} />
      </a>
      <StyledSpan>사진을 누르면 링크로 이동합니다.</StyledSpan>
    </StyledContainer>
  );
};

export default Figma;
