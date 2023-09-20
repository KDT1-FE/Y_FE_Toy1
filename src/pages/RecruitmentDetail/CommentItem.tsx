import React, { useState, useEffect } from 'react';
import { CommentContent, CommentItemWrapper, Btn, BtnWrapper, CommentName, CommentTime, CommentForm } from './style';
import { getRecruitmentDetail, getUserData, deleteComment } from '../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserId, Render } from '../../utils/recoil';
import { useParams, useNavigate } from 'react-router-dom';

interface CommentProps {
    comment: {
        name: string;
        uid: string;
        time: string;
        content: string;
    }; // comment 프로퍼티의 타입은 any로 설정하거나 실제 타입으로 지정
    i: number;
}
const CommentItem: React.FC<CommentProps> = (props) => {
    const [userId, setUserId] = useRecoilState(UserId);
    const [render, setRender] = useRecoilState(Render);
    const [userData, setUserData] = useState<any>({});

    const [data, setData] = useState<any>({});
    const { channel, path } = useParams<{ channel: string; path: string }>();
    // const channel = location.pathname.split('/')[2];
    // const path = location.pathname.split('/')[3];

    useEffect(() => {
        if (channel && path) {
            // Null 체크
            getRecruitmentDetail(channel, path)
                .then((result) => {
                    setData(result);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            getUserData(userId)
                .then((result) => {
                    setUserData(result);
                })
                .catch((error) => {
                    // 에러 핸들링
                    console.error('Error fetching data:', error);
                });
        }
    }, [channel, path]);

    const handleDeleteCommentSubmit = async (e: any) => {
        e.preventDefault();

        if (channel && path) {
            // Null 체크
            if (
                e.target &&
                e.target.uid &&
                e.target.content &&
                e.target.time &&
                e.target.uid.value &&
                e.target.content.value &&
                e.target.time.value
            ) {
                const value = {
                    uid: e.target.uid.value,
                    name: userData.name,
                    imageURL: userData.imageURL,
                    content: e.target.content.value,
                    time: e.target.time.value,
                };
                await deleteComment(channel, path, value);
                setRender(!render);
            } else {
                console.error('uid 또는 content가 정의되지 않았습니다.');
            }
        } else {
            console.error('channel 또는 path가 정의되지 않았습니다.');
        }
    };

    return (
        <CommentItemWrapper>
            <CommentName>
                {props.comment.uid == data.uid ? <span style={{ color: 'blue' }}>글쓴이</span> : props.comment.name}
            </CommentName>
            <CommentForm id={'commentForm' + props.i} onSubmit={handleDeleteCommentSubmit} style={{ margin: '0' }}>
                <input defaultValue={props.comment.uid} name="uid" style={{ display: 'none' }} disabled />
                <CommentContent defaultValue={props.comment.content} name="content" disabled />
                <CommentTime defaultValue={props.comment.time} name="time" disabled />
            </CommentForm>

            {userId == props.comment.uid ? (
                <BtnWrapper>
                    <Btn type="submit" form={'commentForm' + props.i}>
                        삭제
                    </Btn>
                </BtnWrapper>
            ) : (
                ''
            )}
        </CommentItemWrapper>
    );
};

export default CommentItem;
