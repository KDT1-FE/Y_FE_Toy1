import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function PostBox() {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [contents, setContents] = useState<string>('');

  // 임시
  useEffect(() => {
    setTitle('제목');
    setDate('날짜');
    setImageUrl('');
    setContents('내용');
  }, []);

  return (
    <PostBoxWrap>
      <Post>
        <PostHeader>
          <TitleWrap>
            <Title>{title}</Title>
          </TitleWrap>
          <DateWrap>
            <Date>{date}</Date>
          </DateWrap>
        </PostHeader>
        <SeparationWrap>
          <Separation></Separation>
        </SeparationWrap>
        <ContentsWrap>
          <ImageWrap>
            <Image src={imageUrl}></Image>
          </ImageWrap>
          <Contents>{contents}</Contents>
        </ContentsWrap>
      </Post>
    </PostBoxWrap>
  );
};

const PostBoxWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: auto;
  padding: 24px 32px;
  margin-top: 1.5rem;
  border-radius: 12px;
  border: 1px solid #E8E8E8;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleWrap = styled.div`
`;

const Title = styled.span`
  color: #252525;
  font-size: 30px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: 0.3px;
`;

const DateWrap = styled.div`
`;

const Date = styled.span`
  color:  #B7B7B7;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%;
`;

const SeparationWrap = styled.div`
  width: 100%;
  height: 0px;
  margin: 18px 0;
`;

const Separation = styled.div`
  border-bottom: 1px solid #E8E8E8;
`;

const ContentsWrap = styled.div`
  width: 100%;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Image = styled.img`
  width: 80%;
  height: 20rem;
  border: 1px solid black;
`;

const Contents = styled.p`
  color: #3A3A3A;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  white-space: pre-line;
`;