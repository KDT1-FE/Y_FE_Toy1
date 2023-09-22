import { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../common/config';
import imageSrc from '../../assets/github.png';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { StyledImage, StyledSpan } from './Figma';
import { SubPageContainer } from '../../utils/CommonDesign';

const UserFlow = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storageRef = ref(storage, 'png/userflow.png');

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
        <CategoryTitle>UserFlow</CategoryTitle>
        <BreadCrumb>about &gt; 정보 &gt; userflow</BreadCrumb>
      </CategoryTitleSection>
      <a href="https://www.figma.com/file/jsLQThXHLMq914sAd0puuD/Untitled?type=whiteboard&node-id=0-1&t=ClyF71AGO7hYWao5-0">
        <StyledImage src={imageUrl ? imageUrl : imageSrc} />
      </a>
      <StyledSpan>사진을 누르면 figma(UserFlow) 링크로 이동합니다.</StyledSpan>
    </SubPageContainer>
  );
};

export default UserFlow;
