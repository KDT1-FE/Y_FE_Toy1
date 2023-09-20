import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "provider/userContext";
import { collection, doc, deleteDoc, query, onSnapshot, orderBy, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import CommentAdd from "./CommentAdd";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
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
        console.log(doc.id);
        const value = {
          id: doc.id,
          ...doc.data(),
        };
        commentData.push(value);
      });

      // 데이터가 변경될 때마다 상태를 업데이트
      setCommentValue(commentData);
    });
    console.log("테스트");
    // 컴포넌트 언마운트 시에 구독을 해제
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(commentValue);

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
    }).then((res) => {
      if (res.isConfirmed) {
        //삭제 요청 처리
        deleteDoc(doc(db, "comment", id));
      }
    });

    // await deleteDoc(doc(db, "comment", id));
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

  console.log("dd");
  const renderComments = commentValue.map((comment) => (
    <Comment_Container key={comment.id}>
      <CommentEntry>
        <Comment_user>
          <div>티어 사진</div>
          <div>{comment.useName}</div>
          <div>{comment.updatedAt}</div>
        </Comment_user>
        <div>
          {editComment === comment.id && open ? <input onChange={handleChange}></input> : <div>{comment.comment}</div>}
        </div>
      </CommentEntry>
      {user?.uid == comment.uid && (
        <div>
          {editComment === comment.id && open ? (
            <Comment_btn onClick={() => handleUpdate(comment.id)}>
              <AiOutlineCheckCircle />
            </Comment_btn>
          ) : (
            <Comment_btn onClick={() => handleEdit(comment.id)}>
              <FiEdit2 />
            </Comment_btn>
          )}

          <Comment_btn onClick={() => handleDelete(comment.id)}>
            <RiDeleteBin5Line />
          </Comment_btn>
        </div>
      )}
    </Comment_Container>
  ));

  return (
    <>
      <Container>
        {/* 댓글 추가 */}
        <CommentAdd />
        {renderComments}
        <div></div>
      </Container>
    </>
  );
};

export default Comment;
const Container = styled.div`
  height: 300px;
  width: 100%;
  margin: 30px;
  // background-color: pink;
  border-top: 3px solid #ddd;
`;
const Comment_Container = styled.div`
  height: 60px;
  width: 800px;
  display: flex;
  justify-content: space-between;
  // margin: 30px;
  background-color: pink;
  border: 3px solid #ddd;
`;

const CommentEntry = styled.div``;

// 티어 사진, 닉네임, 작성시간
const Comment_user = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 버튼 css
const Comment_btn = styled.button`
  border: 0;
  background-color: transparent;
  background-color: var(--main-color);
  color: white;
  font-size: 20px;
  padding: 20px;
  border-radius: 50%;
  margin: 10px;
`;
