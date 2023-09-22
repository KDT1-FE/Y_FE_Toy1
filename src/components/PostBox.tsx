import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../common/config';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

type NoticeData = {
  title?: string;
  date?: string;
  imageUrl?: string;
  contents?: string;
};

export default function PostBox() {
  const [data, setData] = useState<NoticeData>({});
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const { index } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (noticeId: string) => {
      if (!noticeId) {
        return;
      }

      try {
        const docRef = doc(db, 'notice', noticeId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const firebaseData = docSnapshot.data();
          setData(firebaseData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData(index!);
  }, []);

  useEffect(() => {
    if (!data) return;

    // console.log(data);

    if (data.title) {
      setTitle(data.title!);
      setDate(data.date!);
      setImageUrl(data.imageUrl!);
      setContents(data.contents!.split('\\n').join('\n'));
    }
  }, [data]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
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
}

const PostBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2.6rem;
  @media screen and (max-width: 700px) {
    padding: 0 1.1rem;
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 24px 32px;
  margin: 2rem 0;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  @media screen and (max-width: 700px) {
    padding: 20px 25px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media screen and (max-width: 700px) {
    display: block;
  }
`;

const TitleWrap = styled.div``;

const Title = styled.span`
  color: #252525;
  font-size: 28px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: 0.3px;
  @media screen and (max-width: 700px) {
    font-size: 25px;
    word-break: keep-all;
  }
`;

const DateWrap = styled.div``;

const Date = styled.span`
  color: gray;
  font-size: 14px;
  line-height: 140%;
`;

const SeparationWrap = styled.div`
  width: 100%;
  height: 0px;
  margin: 18px 0;
`;

const Separation = styled.div`
  border-bottom: 1px solid #e8e8e8;
`;

const ContentsWrap = styled.div`
  width: 100%;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 1.5rem 0;
  @media screen and (max-width: 700px) {
    margin: 0.5rem 0 1.1rem 0;
  }
`;

const Image = styled.img`
  width: 60%;
  max-width: 500px;
  object-fit: contain;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const Contents = styled.p`
  color: #3a3a3a;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  white-space: pre-line;
`;
