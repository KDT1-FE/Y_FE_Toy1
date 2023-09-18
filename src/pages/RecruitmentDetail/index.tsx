import React, { useState, useEffect } from 'react';
import {
    CommentBtn,
    CommentItemWrapper,
    Btn,
    BtnWrapper,
    CommentName,
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
import CommentItem from './CommentItem';
import SidebarGallery from '../../components/SidebarGallery';
import { getRecruitmentDetail, getUserName, createComment } from '../../utils/firebase';
import MDEditor from '@uiw/react-md-editor';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { useNavigate } from 'react-router-dom';

const RecruitmentDetail: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [userName, setUserName] = useState('');

    const [data, setData] = useState<any>({});

    const navigate = useNavigate();

    const channel = location.pathname.split('/')[2];
    const path = location.pathname.split('/')[3];

    console.log(location.pathname);

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

    const handleCreateCommentSubmit = async (e: any) => {
        e.preventDefault();

        // e.target 및 속성의 존재 여부 확인
        if (e.target && e.target.uid && e.target.content && e.target.uid.value && e.target.content.value) {
            const fullDate = new Date();
            const date =
                fullDate.getFullYear() +
                '/' +
                (fullDate.getMonth() + 1) +
                '/' +
                fullDate.getDate() +
                ' ' +
                fullDate.getHours() +
                ':' +
                fullDate.getMinutes();
            const value = { uid: e.target.uid.value, content: e.target.content.value, time: date };
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
                        {data.comment ? data.comment.map((v: any, i: number) => <CommentItem comment={v} i={i} />) : ''}
                        <CommentItemWrapper>
                            <CommentName>{userName}</CommentName>
                            <form id="comment" onSubmit={handleCreateCommentSubmit}>
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
                        </CommentItemWrapper>
                    </CommentWrapper>
                ) : (
                    ''
                )}
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
