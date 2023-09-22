import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../common/config';
import imageSrc from '../../assets/notion.png';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { StyledImage, StyledSpan } from './Figma';
import { SubPageContainer } from '../../utils/CommonDesign';

const Notion = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(storage, 'png/notion.png');

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
        <CategoryTitle>Notion</CategoryTitle>
        <BreadCrumb>about &gt; 정보 &gt; notion</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.notion.so/i-b0512a32e6f1405a9cd5c5305691982d">
        <StyledImage src={imageUrl ? imageUrl : imageSrc} />
      </a>
      <StyledSpan>사진을 누르면 notion 링크로 이동합니다.</StyledSpan>
    </SubPageContainer>
  );
};

export default Notion;
