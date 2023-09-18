import React, { useState, useEffect } from 'react';
import { CommentContent, CommentItemWrapper, Btn, BtnWrapper, CommentName, CommentTime, CommentForm } from './style';
import { getRecruitmentDetail, getUserName, deleteComment } from '../../utils/firebase';
import { useRecoilState } from 'recoil';
import { UserId } from '../../utils/recoil';
import { useNavigate } from 'react-router-dom';

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

    const [data, setData] = useState<any>({});

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

    const handleDeleteCommentSubmit = async (e: any) => {
        e.preventDefault();

        // e.target 및 속성의 존재 여부 확인
        if (
            e.target &&
            e.target.uid &&
            e.target.content &&
            e.target.time &&
            e.target.uid.value &&
            e.target.content.value &&
            e.target.time.value
        ) {
            const value = { uid: e.target.uid.value, content: e.target.content.value, time: e.target.time.value };
            await deleteComment(channel, path, value);

            console.log(value);
            // location.reload();
        } else {
            console.error('uid 또는 content가 정의되지 않았습니다.');
        }
    };

    return (
        <CommentItemWrapper>
            <CommentName>
                {props.comment.uid == data.uid ? <span style={{ color: 'blue' }}>글쓴이</span> : props.comment.name}
            </CommentName>
            <CommentForm id={'commentForm' + props.i} onSubmit={handleDeleteCommentSubmit}>
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
