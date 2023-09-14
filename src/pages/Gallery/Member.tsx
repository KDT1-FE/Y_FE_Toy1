import styled from 'styled-components';
import {
  GalleryMainContainer,
  CategoryTitleSection,
  BreadCrumb,
  ImageSection as ProfileSection,
} from './Project';
import imageUrl from '../../assets/memberDummyImage.webp';

const Member = () => {
  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <h1>멤버 소개</h1>
        <BreadCrumb>갤러리 &gt; 멤버 &gt; 멤버 소개</BreadCrumb>
      </CategoryTitleSection>
      <ProfileSection>
        <ImageWrapper imageUrl={imageUrl} />
        <ImageWrapper imageUrl={imageUrl} />
        <ImageWrapper imageUrl={imageUrl} />
        <ImageWrapper imageUrl={imageUrl} />
      </ProfileSection>
    </GalleryMainContainer>
  );
};

export default Member;

const ImageWrapper = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div
      style={{ width: '30%', marginBottom: '5%', border: '1px solid #E9E9E9', borderRadius: '4px' }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div
        style={{ margin: '18px 0 14px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}
      >
        꼬부기
      </div>
      <div style={{ padding: '0 18px 18px' }}>
        특징입니다 특징입니다 특징입니다 특징입니다 특징입니다 특징입니다 특징입니다 특징입니다
        특징입니다 특징입니다 특징입니다 특징입니다{' '}
      </div>
    </div>
  );
};
