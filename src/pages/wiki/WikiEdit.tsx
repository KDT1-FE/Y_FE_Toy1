import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import EditorBox from "../../components/template/EditorBox";
import { AuthContext } from "provider/userContext";
import dayjs from "dayjs";

//한국 날짜 설정
dayjs.locale("ko");

interface ValueState {
  title: string;
  content: string;
  updatedAt: string;
  displayName: string;
}

const WikiEdit = () => {
  const navigate = useNavigate();

  //페이지 정보
  const { page } = useParams();

  // 로그인한 회원 정보
  const user = useContext(AuthContext);

  const [value, setValue] = useState<ValueState>({
    title: "",
    content: "",
    updatedAt: "",
    displayName: "",
  });

  //firebase에 문서 update
  const upDateUser = async (value: ValueState) => {
    if (page) {
      await updateDoc(doc(db, "wiki", page), {
        title: value.title,
        content: value.content,
        updatedAt: dayjs().format("YYYY.MM.DD  HH:mm:ss"),
        displayName: user?.displayName,
      });
      console.log("Document updated successfully");
    } else {
      console.error("Invalid page value");
    }
  };

  // page정보 바뀌었을 때 firebase에 문서 가져오기
  useEffect(() => {
    if (page) {
      const fetchUser = async (uid: string) => {
        // ... try, catch 생략
        const userRef = doc(db, "wiki", uid);
        const userSnap = await getDoc(userRef); // 데이터 스냅 받아오기 - 비동기처리

        if (userSnap.exists()) {
          const { title, content, updatedAt, displayName } = userSnap.data();
          setValue({ title, content, updatedAt, displayName });
        }
        return null;
      };
      fetchUser(page);
    }
  }, [page]);

  // title 타이핑 하는 값 받아오기
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, title: e.target.value }));
  };

  // 수정 완료 버튼 함수
  const handleSubmitBtn = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼의 기본 동작 중단
    await upDateUser(value);
    navigate(`/Wiki/${page}`);
  };

  return (
    <>
      <div className="wiki__wrapper">
        <form onSubmit={handleSubmitBtn}>
          <div className="wiki__header">
            <input
              className="wikiEdit__title "
              name="title"
              onChange={handleTitleChange}
              value={value.title}
            />
            <div className="wikiEdit__btn">
              <button className="wikiEdit__btn-edit" type="submit">
                완료
              </button>
              <button
                className="wikiEdit__btn-edit"
                onClick={() => {
                  navigate(-1);
                }}
              >
                취소
              </button>
            </div>
          </div>
          <div className="wikiEdit__textContent">
            <EditorBox setValue={setValue} />
          </div>
        </form>
      </div>
    </>
  );
};

export default WikiEdit;
