import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "provider/userContext";
import {
  collection,
  doc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import CommentAdd from "./CommentAdd";
import { IsMobile } from "utils/mediaQuery";

//한국 날짜 설정
dayjs.locale("ko");

const Comment = () => {
  const user = useContext(AuthContext);

  // 변경된 댓글 내용 관리
  const [comment, setComment] = useState("dd");

  const [commentValue, setCommentValue] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "comment"), orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentData: any[] = [];
      snapshot.forEach((doc) => {
        const value = {
          id: doc.id,
          ...doc.data(),
        };
        commentData.push(value);
      });

      // 데이터가 변경될 때마다 상태를 업데이트
      setCommentValue(commentData);
    });
    // 컴포넌트 언마운트 시에 구독을 해제
    return () => {
      unsubscribe();
    };
  }, []);

  // 수정 버튼 눌린 id값 얻기
  const [editComment, setEditComment] = useState<string>("");

  // 댓글 삭제
  const handleDelete = async (id: string) => {
    await Swal.fire({
      icon: "warning",
      title: "정말로 삭제하시겠습니까?",
      text: "한 번 삭제하면 되돌릴 수 없습니다.",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      confirmButtonColor: "#ED234B",
    }).then((res) => {
      if (res.isConfirmed) {
        //삭제 요청 처리
        deleteDoc(doc(db, "comment", id));
      }
    });
  };

  // 댓글 수정
  const handleEdit = (id: string) => {
    setEditComment(id);
    setOpen(true);
  };

  // 수정시 input 값 얻기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // 수정 완료 함수
  const handleUpdate = async (id: string) => {
    await updateDoc(doc(db, "comment", id), {
      comment: comment,
      // updatedAt: dayjs().format("YYYY.MM.DD HH:mm:ss"),
    });
    setOpen(false);
  };

  const [open, setOpen] = useState<boolean>(false);

  const renderComments = commentValue.map((comment) => (
    <Comment_Container key={comment.id}>
      <CommentEntry>
        <Comment_user>
          <img
            src={process.env.PUBLIC_URL + `/png/class_${comment.class}.png`}
          />
          <Comment_user__name>{comment.useName}</Comment_user__name>

          <Comment_user__updateAt>{comment.updatedAt}</Comment_user__updateAt>
        </Comment_user>

        {editComment === comment.id && open ? (
          <Comment_input onChange={handleChange}></Comment_input>
        ) : (
          <Comment_reply>{comment.comment}</Comment_reply>
        )}
      </CommentEntry>
      {user?.uid == comment.uid && (
        <Comment_btn__container>
          {editComment === comment.id && open ? (
            <Comment_btn onClick={() => handleUpdate(comment.id)}>
              완료
            </Comment_btn>
          ) : (
            <Comment_btn onClick={() => handleEdit(comment.id)}>
              수정
            </Comment_btn>
          )}

          <Comment_btn onClick={() => handleDelete(comment.id)}>
            삭제
          </Comment_btn>
        </Comment_btn__container>
      )}
    </Comment_Container>
  ));

  return (
    <>
      {/* 댓글 추가 */}
      <CommentAdd />
      {renderComments}
      <div></div>
    </>
  );
};

export default Comment;

const Comment_Container = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  padding: 10px;
`;

const CommentEntry = styled.div`
  width: 80%;
  height: 100%;
`;

// 티어 사진, 닉네임, 작성시간
const Comment_user = styled.div`
  height: 27px;
  width: 500px;
  min-width: 380px;
  display: flex;

  @media (max-width: 650px) {
    width: 300px;
    min-width: 300px;
  }
`;

const Comment_user__name = styled.div`
  min-width: 200px;
  font-weight: 700;
  font-size: 20px;
  padding: 0 10px;

  @media (max-width: 650px) {
    font-size: 18px;
    min-width: 120px;
    max-width: 120px;
    white-space: nowrap; // 개행 방지
    overflow: hidden; // 넘치는 문자열 숨김
    text-overflow: ellipsis;
    padding: 2px 10px 0 10px;
  }
`;

const Comment_user__updateAt = styled.div`
  font-weight: 400;
  color: #a6a4a4;
  padding-top: 7px;
  font-size: 13px;
`;

const Comment_input = styled.input`
  height: 25px;
  width: 100%;
  min-width: 400px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  margin: 5px 10px 5px 5px;
  border: 1px solid #ddd;
`;

const Comment_reply = styled.div`
  font-size: 18px;
  height: 25px;
  width: 80%;
  margin: 5px 5px 5px 0px;
`;

// 버튼 css
const Comment_btn__container = styled.div`
  display: flex;
  width: 20%;
  justify-content: flex-end;
`;

const Comment_btn = styled.button`
  min-width: 50px;
  margin-top: 10px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  font-size: 12px;
  padding: 20px 7px 7px 7px;
  border-radius: 4px;
`;
