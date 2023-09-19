import React, { useState, useEffect } from 'react';
import {
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
    Content,
    RecruitmentDetailContainer,
    DeleteModalContainer,
    DeleteModalWrapper,
    DeleteModalTitle,
    DeleteCloseButton,
    DeleteModal,
    DeleteFallbackButton,
    DeleteCreateButton,
    DeleteText,
    RecruitmentEndBtn,
    ContentUserImage,
    CommentCreateWrapper,
    CommentInputWrapper,
    CommentBtn,
} from './style';
import CommentItem from './CommentItem';
import {
    getRecruitmentDetail,
    getUserName,
    createComment,
    deleteRecruitment,
    updateRecruitment,
    getUserImageURL,
} from '../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserId, Render } from '../../utils/recoil';
import { useNavigate } from 'react-router-dom';
import { RecruitmentData } from '../../utils/recoil';
import { collection, serverTimestamp, getDocs, Firestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const RecruitmentDetail: React.FC = () => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [userName, setUserName] = useState('');
    const [userImageURL, setUserImageURL] = useState('');
    const [recruitmentData, setRecruitmentData] = useRecoilState(RecruitmentData);
    const [deleteModalValued, setDeleteModalValued] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [comments, setComments] = useState([]);
    const [render, setRender] = useRecoilState(Render);

    const [data, setData] = useState<any>({});

    const navigate = useNavigate();

    const channel = location.pathname.split('/')[2];
    const path = location.pathname.split('/')[3];

    useEffect(() => {
        const fetchUserData = async () => {
            const docRef = doc(firestore, 'recruitmentContainer', 'recruitment', channel, path);
            const unsub = await onSnapshot(
                doc(firestore, 'recruitmentContainer', 'recruitment', channel, path),
                (doc) => {
                    console.log('Current data: ', doc.data());
                    setData(doc.data());
                    setComments(doc.data()?.comment);
                },
            );
            return () => {
                unsub();
            };
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!render) {
            setRender(!render);
        }
    }, [render]);

    useEffect(() => {
        // // 데이터를 비동기로 가져오기 위해 useEffect를 사용합니다.
        // getRecruitmentDetail(channel, path)
        //     .then((result) => {
        //         // 데이터를 성공적으로 가져온 후에 setData를 사용하여 값을 설정합니다.
        //         setData(result);
        //     })
        //     .catch((error) => {
        //         // 에러 핸들링
        //         console.error('Error fetching data:', error);
        //     });
        getUserName(userId)
            .then((result) => {
                setUserName(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, [channel, path]);

    useEffect(() => {
        getUserImageURL(data.uid)
            .then((result) => {
                setUserImageURL(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, []);

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
            await createComment(channel, path, value);

            setCommentValue('');
            // location.reload();
        } else {
            console.error('uid 또는 content가 정의되지 않았습니다.');
        }
    };

    const handleEdit = () => {
        for (let i = 0; i < data.comment.length; i++) {
            data.comment[i] = {
                uid: data.comment[i].uid,
                time: data.comment[i].time,
                content: data.comment[i].content,
            };
        }
        setRecruitmentData({ ...data, channel: channel });
        navigate('/recruitment/edit/' + channel + '/' + path, data);
    };

    const handleDeleteRcruitment = (e: any) => {
        deleteRecruitment(channel, path);
        navigate('/recruitment');
    };

    const handleDeleteModal = () => {
        setDeleteModalValued(!deleteModalValued);
    };

    const handleRecruitmentValued = () => {
        const updated_at_timestamp = serverTimestamp();

        const value = {
            category: data.category,
            comment: data.comment,
            content: data.content,
            people: data.people,
            recruitValued: !data.recruitValued,
            time: updated_at_timestamp,
            title: data.title,
            uid: data.uid,
            name: data.name,
        };
        for (let i = 0; i < value.comment.length; i++) {
            value.comment[i] = {
                uid: data.comment[i].uid,
                time: data.comment[i].time,
                content: data.comment[i].content,
            };
        }
        updateRecruitment(channel, path, value);

        navigate('/recruitment');
    };
    console.log(data.comment);
    return (
        <RecruitmentDetailContainer>
            {deleteModalValued ? (
                <DeleteModalContainer>
                    <DeleteModalWrapper>
                        <DeleteModal>
                            <DeleteModalTitle>게시글 삭제</DeleteModalTitle>
                            <DeleteCloseButton onClick={handleDeleteModal}>x</DeleteCloseButton>
                            <DeleteText>정말 삭제하시겠습니까?</DeleteText>
                            <DeleteCreateButton onClick={handleDeleteRcruitment}>삭제</DeleteCreateButton>
                            <DeleteFallbackButton onClick={handleDeleteModal}>나가기</DeleteFallbackButton>
                        </DeleteModal>
                    </DeleteModalWrapper>
                </DeleteModalContainer>
            ) : (
                ''
            )}

            <ContentContainer>
                <ContentWrapper>
                    <ContentHeader>
                        <ContentUserImage src={userImageURL} />
                        <ContentHeaderName>{data.name}</ContentHeaderName>
                        {data.recruitValued ? (
                            <ContentHeaderValuedTrue>모집중</ContentHeaderValuedTrue>
                        ) : (
                            <ContentHeaderValuedFalse>모집완료</ContentHeaderValuedFalse>
                        )}
                    </ContentHeader>
                    <ContentTitleWrapper>
                        <h2>{data.title}</h2>
                        <p>{new Date(data.time?.toMillis()).toLocaleString()}</p>
                        {userId == data.uid ? (
                            <BtnWrapper>
                                {data.recruitValued ? <Btn onClick={handleEdit}>수정하기</Btn> : ''}

                                <Btn onClick={handleDeleteModal}>삭제하기</Btn>
                            </BtnWrapper>
                        ) : (
                            ''
                        )}
                    </ContentTitleWrapper>
                    <ContentSub>
                        <p>분야 : {data.category}</p>
                        <p>인원 : {data.people}</p>
                    </ContentSub>
                    <Content>{data.content}</Content>

                    {userId == data.uid ? (
                        data.recruitValued ? (
                            <RecruitmentEndBtn onClick={handleRecruitmentValued}>모집 마감</RecruitmentEndBtn>
                        ) : (
                            ''
                        )
                    ) : (
                        ''
                    )}
                </ContentWrapper>
                {render ? (
                    <CommentWrapper>
                        {comments ? comments.map((v: any, i: number) => <CommentItem comment={v} i={i} />) : ''}
                        <CommentCreateWrapper>
                            <CommentName>댓글 쓰기</CommentName>
                            <CommentInputWrapper>
                                <form id="comment" onSubmit={handleCreateCommentSubmit}>
                                    <input
                                        type="text"
                                        name="uid"
                                        defaultValue={userId}
                                        disabled
                                        style={{ display: 'none' }}
                                    />
                                    <textarea
                                        name="content"
                                        value={commentValue}
                                        style={{ width: '880px', height: '60px', border: '1px solid gray' }}
                                        onChange={(e) => {
                                            setCommentValue(e.target.value);
                                        }}
                                        required
                                    />
                                </form>
                                <CommentBtn type="submit" form="comment">
                                    작성하기
                                </CommentBtn>
                            </CommentInputWrapper>
                        </CommentCreateWrapper>
                    </CommentWrapper>
                ) : (
                    <>1</>
                )}
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
