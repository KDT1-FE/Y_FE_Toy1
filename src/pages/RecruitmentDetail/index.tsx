import React, { useState, useEffect } from 'react';
import {
    Btn,
    BtnWrapper,
    CommentInputName,
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
    RecruitmentEndBtn,
    ContentUserImage,
    CommentCreateWrapper,
    CommentInputWrapper,
    CommentBtn,
} from './style';
import CommentItem from './CommentItem';
import { getUserData, createComment, deleteRecruitment, updateRecruitment } from '../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserId, Render, RecruitmentData } from '../../utils/recoil';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import swal from 'sweetalert';

const RecruitmentDetail: React.FC = () => {
    const [userId, setUserId] = useRecoilState<string>(UserId);
    const [recruitmentData, setRecruitmentData] = useRecoilState(RecruitmentData);
    const [commentValue, setCommentValue] = useState('');
    const [comments, setComments] = useState([]);
    const [render, setRender] = useRecoilState(Render);
    const [userData, setUserData] = useState<any>({});
    const [commentLength, setCommentLength] = useState<number>(0);

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
                    setData(doc.data());
                    setComments(doc.data()?.comment);
                    setCommentLength(doc.data()?.comment.length);
                    // 수정
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
        getUserData(userId)
            .then((result) => {
                setUserData(result);
            })
            .catch((error) => {
                // 에러 핸들링
                console.error('Error fetching data:', error);
            });
    }, [render]);

    const handleCreateCommentSubmit = async (e: any) => {
        e.preventDefault();

        if (!userId) {
            swal({
                title: '댓글을 작성하실 수 없습니다.',
                text: '로그인 후 사용해주세요 !',
                icon: 'warning',
                // buttons: true,
                // dangerMode: true,
            });
            return;
        }
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
            const value = {
                uid: e.target.uid.value,
                content: e.target.content.value,
                time: date,
                name: userData.name,
                imageURL: userData.imageURL,
                email: userData.email,
            };
            await createComment(channel, path, value);

            swal('댓글이 성공적으로 등록되었습니다!', {
                icon: 'success',
            });
            setCommentValue('');
            // location.reload();
        } else {
            console.error('uid 또는 content가 정의되지 않았습니다.');
        }
    };

    const handleEdit = () => {
        swal({
            title: '정말로 글을 수정하시겠습니까? ',
            text: '수정 버튼을 누르시면 수정 페이지로 이동합니다.!',
            icon: 'info',
            buttons: ['취소', '수정'],
        }).then((willDelete) => {
            if (willDelete) {
                setRecruitmentData({ ...data, channel: channel });
                navigate('/recruitment/edit/' + channel + '/' + path, data);
            } else {
                swal('글 수정을 취소합니다!');
            }
        });
    };

    const handleDeleteRecruitment = () => {
        swal({
            title: '정말로 글을 삭제하시겠습니까? ',
            text: '삭제된 글을 되돌리실 수 없습니다!',
            icon: 'warning',
            buttons: ['취소', '삭제'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal('글을 성공적으로 삭제하였습니다.', {
                    icon: 'success',
                });
                deleteRecruitment(channel, path);
                navigate('/recruitment');
            } else {
                swal('글 삭제를 취소합니다!');
            }
        });
    };

    const handleRecruitmentValued = () => {
        swal({
            title: '모집을 완료하시겠습니까? ',
            text: '모집중으로 되돌리실 수 없습니다!',
            icon: 'info',
            buttons: ['취소', '모집 완료'],
        }).then((willDelete) => {
            if (willDelete) {
                swal('모집이 성공적으로 마감되었습니다.', {
                    icon: 'success',
                });
                const value = data;
                value.recruitValued = !value.recruitValued;

                console.log(value);

                updateRecruitment(channel, path, value);
            } else {
                swal('모집 마감이 취소되었습니다.!');
            }
        });
    };

    return (
        <RecruitmentDetailContainer>
            <ContentContainer>
                <ContentWrapper>
                    <ContentHeader>
                        <ContentUserImage src={data.imageURL} />
                        <ContentHeaderName>{data.name}</ContentHeaderName>
                        {data.recruitValued ? (
                            <ContentHeaderValuedTrue>모집중</ContentHeaderValuedTrue>
                        ) : (
                            <ContentHeaderValuedFalse>모집완료</ContentHeaderValuedFalse>
                        )}
                    </ContentHeader>
                    <ContentTitleWrapper>
                        <h2>{data.title}</h2>
                        <p>
                            {data.editValued
                                ? new Date(data.editTime?.toMillis()).toLocaleString() + ' (수정됨)'
                                : new Date(data.time?.toMillis()).toLocaleString()}
                        </p>
                        {userId == data.uid ? (
                            <BtnWrapper>
                                {data.recruitValued ? <Btn onClick={handleEdit}>수정</Btn> : ''}

                                <Btn onClick={handleDeleteRecruitment}>삭제</Btn>
                            </BtnWrapper>
                        ) : (
                            ''
                        )}
                    </ContentTitleWrapper>
                    <ContentSub>
                        <p>분야 : {data.category}</p>
                        <p>인원 : {data.people} 명</p>
                        <p>댓글 : {commentLength} 개</p>
                    </ContentSub>
                    <Content>
                        {data.content?.split('\n').map((line: string) => {
                            //this.props.data.content: 내용
                            return (
                                <span>
                                    {line}
                                    <br />
                                </span>
                            );
                        })}
                    </Content>

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
                            <CommentInputName>댓글 쓰기</CommentInputName>
                            <CommentInputWrapper>
                                <form id="comment" onSubmit={handleCreateCommentSubmit}>
                                    <input
                                        type="text"
                                        name="uid"
                                        defaultValue={userId}
                                        disabled
                                        style={{ display: 'none' }}
                                    />
                                    <input
                                        name="content"
                                        value={commentValue}
                                        style={{
                                            width: '880px',
                                            height: '60px',
                                            border: '1px solid gray',
                                            borderRadius: '5px',
                                            fontSize: '1rem',
                                            paddingLeft: '10px',
                                        }}
                                        onChange={(e) => {
                                            setCommentValue(e.target.value);
                                        }}
                                        required
                                    />
                                </form>
                                <CommentBtn type="submit" form="comment">
                                    작성
                                </CommentBtn>
                            </CommentInputWrapper>
                        </CommentCreateWrapper>
                    </CommentWrapper>
                ) : (
                    <>로딩중..</>
                )}
            </ContentContainer>
        </RecruitmentDetailContainer>
    );
};

export default RecruitmentDetail;
