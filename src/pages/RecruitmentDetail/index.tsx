import React, { useState, useEffect } from 'react';
import {
    CommentBtn,
    CommentContent,
    CommentItem,
    Btn,
    BtnWrapper,
    CommentName,
    CommentTime,
    CommentWrapper,
    ContentContainer,
    ContentHeader,
    ContentHeaderName,
    ContentHeaderValuedFalse,
    ContentHeaderValuedTrue,
    ContentSub,
    ContentTitleWrapper,
    ContentWrapper,
    RecruitmentDetailContainer,
} from './style';
import SidebarGallery from '../../components/SidebarGallery';
import { getRecruitmentDetail } from '../../utils/firebase';
import MDEditor from '@uiw/react-md-editor';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';

const RecruitmentDetail: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);

    const [clickedValue, setClickedValue] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const handleKeyClick = (value: any) => {
        setClickedValue(value);
    };

    const channel = location.pathname.split('/')[2];
    const path = location.pathname.split('/')[3];

    useEffect(() => {
        // 데이터를 비동기로 가져오기 위해 useEffect를 사용합니다.
        getRecruitmentDetail(channel, path)
            .then((result) => {
                // 데이터를 성공적으로 가져온 후에 setData를 사용하여 값을 설정합니다.
                setData(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, [channel, path]);

    return (
        <RecruitmentDetailContainer>
            <SidebarGallery onKeyClick={handleKeyClick} />
            <ContentContainer>
                <ContentWrapper>
                    <ContentHeader>
                        <ContentHeaderName>{data.name}</ContentHeaderName>
                        {data.recruitValued ? (
                            <ContentHeaderValuedTrue>모집중</ContentHeaderValuedTrue>
                        ) : (
                            <ContentHeaderValuedFalse>모집완료</ContentHeaderValuedFalse>
                        )}
                    </ContentHeader>
                    <ContentTitleWrapper>
                        <h2>{data.title}</h2>
                        <p>09/16 12:11</p>
                        {userId == data.uid ? (
                            <BtnWrapper>
                                <Btn>수정하기</Btn>
                                <Btn>삭제하기</Btn>
                            </BtnWrapper>
                        ) : (
                            ''
                        )}
                    </ContentTitleWrapper>
                    <ContentSub>
                        <p>분야 : {data.category}</p>
                        <p>인원 : {data.people}</p>
                    </ContentSub>
                    <MDEditor.Markdown
                        source={data.content}
                        style={{ width: '100%', padding: '20px', backgroundColor: 'white' }}
                    />
                </ContentWrapper>
                <CommentBtn>댓글 쓰기</CommentBtn>
                {data.comment ? (
                    <CommentWrapper>
                        {data.comment
                            ? data.comment.map((v: any) => (
                                  <CommentItem>
                                      <CommentName>
                                          {v.uid == data.uid ? <span style={{ color: 'blue' }}>글쓴이</span> : v.name}
                                      </CommentName>
                                      <CommentContent>{v.content}</CommentContent>
                                      <CommentTime>{v.time}</CommentTime>
                                      {userId == v.uid ? (
                                          <BtnWrapper>
                                              <Btn>수정</Btn>
                                              <Btn>삭제</Btn>
                                          </BtnWrapper>
                                      ) : (
                                          ''
                                      )}
                                  </CommentItem>
                              ))
                            : ''}
                    </CommentWrapper>
                ) : (
                    ''
                )}
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
