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
import { getRecruitmentDetail, getUserName, createComment } from '../../utils/firebase';
import MDEditor from '@uiw/react-md-editor';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { useNavigate } from 'react-router-dom';

const RecruitmentDetail: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [userName, setUserName] = useState('');

    const [clickedValue, setClickedValue] = useState<any>(null);
    const [data, setData] = useState<any>({});

    const navigate = useNavigate();

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

        getUserName(userId)
            .then((result) => {
                setUserName(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, [channel, path]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(e.target, e.target.uid, e.target.content);
        // e.target 및 속성의 존재 여부 확인
        if (e.target && e.target.uid && e.target.content && e.target.uid.value && e.target.content.value) {
            const value = { uid: e.target.uid.value, content: e.target.content.value };
            console.log(value);
            await createComment(channel, path, value);
            console.log('댓글 작성');
            location.reload();
        } else {
            console.error('uid 또는 content가 정의되지 않았습니다.');
        }
    };

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
                        <CommentItem>
                            <CommentName>{userName}</CommentName>
                            <form id="comment" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="uid"
                                    defaultValue={userId}
                                    disabled
                                    style={{ display: 'none' }}
                                />
                                <textarea name="content" style={{ width: '100%' }} required />

                                <button type="submit">작성하기</button>
                            </form>
                        </CommentItem>
                    </CommentWrapper>
                ) : (
                    ''
                )}
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
