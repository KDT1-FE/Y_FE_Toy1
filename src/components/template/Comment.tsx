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

// import { ReactComponent as emblem_gold } from "../../../public/svg/emblem/emblem_gold.svg";
// import { ReactComponent as emblem_sliver } from "../../../public/svg/emblem/emblem_sliver.svg";
// import { ReactComponent as emblem_bronze } from "/svg/emblem/emblem_bronze.svg";

//한국 날짜 설정
dayjs.locale("ko");

const Comment = () => {
  const user = useContext(AuthContext);

  const emblem = () => {
    if (user) {
      Number(localStorage.getItem(user.uid));
      console.log(Number(localStorage.getItem(user.uid)));
    }
  };
  emblem();

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

  const renderComments = commentValue.map((comment) => (
    <Comment_Container key={comment.id}>
      <CommentEntry>
        <Comment_user>
          <div>티어 사진</div>

          <Comment_user__name>{comment.useName}</Comment_user__name>
          <Comment_user__updateAt>{comment.updatedAt}</Comment_user__updateAt>
        </Comment_user>
        <div>
          {editComment === comment.id && open ? (
            <Comment_input onChange={handleChange}></Comment_input>
          ) : (
            <Comment_reply>{comment.comment}</Comment_reply>
          )}
        </div>
      </CommentEntry>
      {user?.uid == comment.uid && (
        <div>
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

// 임시로 핑크 박스
const Container = styled.div`
  height: 300px;
  width: 100%;
  margin: 30px;
  // background-color: pink;
  border-top: 3px solid #ddd;
`;

const Comment_Container = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  // margin: 30px;
  //background-color: pink;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
  padding: 10px;
`;

const CommentEntry = styled.div`
  width: 90%;
  height: 100%;
  //background-color: blue;
`;

// 티어 사진, 닉네임, 작성시간
const Comment_user = styled.div`
  height: 27px;
  //background-color: yellow;
  width: 35%;
  display: flex;
  justify-content: space-between;
`;

const Comment_user__name = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const Comment_user__updateAt = styled.div`
  font-weight: 400;
  color: #a6a4a4;
  padding-top: 5px;
  //padding-right: 20px;
`;

const Comment_input = styled.input`
  height: 25px;
  width: 100%;
  // padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  // border: 0;
  // border-bottom: 1px solid var(--main-color);
  outline: none;
  margin: 5px;
  border: 1px solid #ddd;
`;

const Comment_reply = styled.div`
  font-size: 18px;
  height: 25px;
  width: 80%;
  // padding-left: 10px;
  margin: 5px 5px 5px 0px;
`;

// 버튼 css
const Comment_btn = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  //background-color: var(--main-color);
  color: ${(props) => props.theme.text};
  font-size: 12px;
  padding: 7px;
  border-radius: 4px;
  // margin: 15px 5px 15px 15px;
`;
