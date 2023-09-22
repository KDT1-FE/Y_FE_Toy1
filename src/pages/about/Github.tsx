import { CategoryTitleSection, BreadCrumb } from '../Gallery/Project';
import { StyledImage, StyledContainer, StyledSpan } from './Figma';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../common/config';
import imageSrc from '../../assets/github.png';

const Github = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(storage, 'png/github.png');

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
        <h1>Github</h1>
        <BreadCrumb>about &gt; 정보 &gt; github</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://github.com/JSH99/Toy1_Team13">
        <StyledImage src={imageUrl ? imageUrl : imageSrc} />
      </a>
      <StyledSpan>사진을 누르면 링크로 이동합니다.</StyledSpan>
    </StyledContainer>
  );
};

export default Github;
