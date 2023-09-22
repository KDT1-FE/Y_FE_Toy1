import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Editor from "components/template/Editor";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "provider/userContext";
import userData from "./UserData";
import Swal from "sweetalert2";

// 함수 인자 타입 선언
interface GalleryDetailProps {
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryData: React.Dispatch<React.SetStateAction<userData[]>>;
}

const GalleryEdit: React.FC<GalleryDetailProps> = ({
  onEdit,
  setOnEdit,
  setGalleryData,
}) => {
  // 에디터 컴포넌트에 사용될 ref
  const quillRef = useRef();
  const user = useContext(AuthContext);
  const usersCollectionRef = collection(db, "gallery");

  // addDoc할 상태관리
  const [originData, setOriginData] = useState({
    category: "",
    title: "",
    desc: "",
  });

  // 이미지 상태관리
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageEdit, setImageEdit] = useState<File | null>(null);

  // 현재 url의 id 값
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const createUser = async (e: React.FormEvent) => {
    // 새로고침방지
    e.preventDefault();

    // 카테고리, 제목, 설명 유효성 검사
    if (!originData.category || !originData.title || !originData.desc) {
      Swal.fire({
        icon: "error",
        title: "모든 필드를 채워주세요",
        confirmButtonText: "확인",
        confirmButtonColor: "#ED234B",
      });
      return; // 유효성 검사 실패 시 함수 종료
    }

    // 글 작성한 날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const printedData = `${year}-${month}-${day}`;
    // 등록할 썸네일 변수선언
    let thumbnailUrl: string | undefined;

    // 썸네일 이미지 업로드
    if (imageUpload) {
      const imageRef = ref(storage, `image/${imageUpload.name}`);
      try {
        // 등록된 썸네일 url 구하기
        const snapshot = await uploadBytes(imageRef, imageUpload);
        const url = await getDownloadURL(snapshot.ref);
        thumbnailUrl = url;

        Swal.fire({
          icon: "success",
          title: "등록 성공했습니다",
          confirmButtonText: "확인",
          confirmButtonColor: "#ED234B",
        });
      } catch (error) {
        // 이미지 업로드 실패 처리
        console.error("Error uploading image:", error);
      }
    }
    // 이미지 미지정시, 디폴트 이미지 삽입
    else {
      thumbnailUrl = "/assets/default-image.jpg";

      Swal.fire({
        icon: "success",
        title: "등록 성공했습니다",
        confirmButtonText: "확인",
        confirmButtonColor: "#ED234B",
      });
    }

    // fire DB에 데이터 올리기
    await addDoc(usersCollectionRef, {
      category: originData.category,
      title: originData.title,
      desc: originData.desc,
      timestamp: today,
      date: printedData,
      writer: user?.displayName,
      uid: user?.uid,
      thumbnail: thumbnailUrl,
    });

    setGalleryData((prevData) => [
      {
        category: originData.category,
        title: originData.title,
        desc: originData.desc,
        timestamp: Timestamp.now(),
        date: printedData,
        writer: String(user?.displayName),
        uid: user?.uid,
        thumbnail: thumbnailUrl,
      },
      ...prevData,
    ]);

    // 리스트 경로로 이동
    navigate("/Gallery");
  };

  // 에디터 업로드
  const onEditorChange = (value: string) => {
    setOriginData({
      ...originData,
      desc: value,
    });
  };

  const onEditorEdit = (value: string) => {
    setFormData({
      ...formData,
      desc: value,
    });
  };

  // 데이터 수정
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // 글 작성한 날짜 구하기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const printedData = `${year}-${month}-${day}`;

    // 해당 문서의 참조 얻기
    const usersCollectionRef = collection(db, "gallery");
    const userRef = doc(usersCollectionRef, id);

    // 썸네일 url
    let editUrl: string | undefined;

    // 이미지 업로드 후 url 받아오기
    if (imageEdit) {
      const imageRef = ref(storage, `image/${imageEdit.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, imageEdit);
        editUrl = await getDownloadURL(snapshot.ref);
        Swal.fire({
          icon: "success",
          title: "수정 완료했습니다",
          confirmButtonText: "확인",
          confirmButtonColor: "#ED234B",
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        // 이미지 업로드 실패 처리
      }
    } else {
      editUrl = formData.thumbnail;
    }

    try {
      // fire DB에 데이터 업데이트
      await updateDoc(userRef, {
        date: printedData,
        timestamp: today,
        category: formData.category,
        title: formData.title,
        desc: formData.desc,
        thumbnail: editUrl,
      });

      setGalleryData((prevData) => {
        return prevData.map((item) => {
          if (item.id === id) {
            return {
              id: id,
              category: formData.category,
              title: formData.title,
              desc: formData.desc,
              timestamp: Timestamp.now(),
              date: printedData,
              writer: String(user?.displayName),
              uid: user?.uid,
              thumbnail: editUrl,
            };
          } else {
            return item;
          }
        });
      });
      Swal.fire({
        icon: "success",
        title: "수정 완료했습니다",
        confirmButtonText: "확인",
        confirmButtonColor: "#ED234B",
      });
      setOnEdit(false);
      navigate(-1);
    } catch (error) {
      console.error("문서 업데이트 실패:", error);
    }
  };

  // 이미지 미리보기
  const [previewUrl, setPreviewUrl] = useState("");
  const [createUrl, setCreateUrl] = useState("");

  const updateUrl = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (onEdit) {
      if (uploadedFile) {
        setImageEdit(uploadedFile);

        const imageRef = ref(storage, `image/${uploadedFile.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, uploadedFile);
          const editUrl = await getDownloadURL(snapshot.ref);
          setPreviewUrl(editUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          // 이미지 업로드 실패 처리
        }
      }
    } else {
      if (uploadedFile) {
        setImageUpload(uploadedFile);

        const imageRef = ref(storage, `image/${uploadedFile.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, uploadedFile);
          const editUrl = await getDownloadURL(snapshot.ref);
          setCreateUrl(editUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          // 이미지 업로드 실패 처리
        }
      }
    }
  };

  // 수정된 데이터 상태관리
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    title: "",
    desc: "",
    thumbnail: "",
  });

  // 해당 id의 데이터 불러오기
  useEffect(() => {
    const fetchUser = async (id: string | undefined) => {
      // ... try, catch 생략
      const usersCollectionRef = collection(db, "gallery");
      const userRef = doc(usersCollectionRef, id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { category, title, desc, thumbnail, date } = userSnap.data();
        setFormData({
          category,
          title,
          desc,
          thumbnail,
          date,
        });
      }
    };
    if (onEdit && id) {
      fetchUser(id);
    }
  }, [onEdit, id]);

  const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const setOriginCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOriginData({
      ...originData,
      category: e.target.value,
    });
  };

  const setOriginTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginData({
      ...originData,
      title: e.target.value,
    });
  };

  return (
    <FormSection>
      {onEdit ? (
        // onEdit 이 true일 경우
        <form onSubmit={updateUser}>
          <FormList>
            <div className="select__wrap">
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={setCategory}
              >
                <option value="">카테고리 선택</option>
                <option value="notice">공지사항</option>
                <option value="news">모집공고</option>
                <option value="random">랜덤토크</option>
              </select>
            </div>
          </FormList>
          <FormList>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요"
              value={formData.title}
              onChange={setTitle}
            />
          </FormList>
          <FormList>
            <Editor
              value={formData.desc}
              onChange={onEditorEdit}
              quillRef={quillRef}
            />
          </FormList>
          <FormList>
            <div className="preview">
              {previewUrl ? (
                <img src={previewUrl} alt="썸네일" />
              ) : (
                <img src={formData.thumbnail} alt="썸네일" />
              )}
              <input type="file" id="thumbnail" onChange={updateUrl} />
            </div>
          </FormList>
          <GalleryBtn>
            <button type="submit">제출</button>
          </GalleryBtn>
        </form>
      ) : (
        // onEdit 이 false일 경우
        <form action="" onSubmit={createUser}>
          <FormList>
            <div className="select__wrap">
              <select
                name="category"
                id="category"
                onChange={setOriginCategory}
              >
                <option value="">카테고리 선택</option>
                <option value="notice">공지사항</option>
                <option value="news">모집공고</option>
                <option value="random">랜덤토크</option>
              </select>
            </div>
          </FormList>
          <FormList>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={setOriginTitle}
            />
          </FormList>
          <FormList>
            <Editor
              value={originData.desc}
              onChange={onEditorChange}
              quillRef={quillRef}
            />
          </FormList>
          <FormList>
            <div className="preview">
              {createUrl ? (
                <img src={createUrl} alt="썸네일" />
              ) : (
                <img src="/assets/default-image.jpg" alt="썸네일" />
              )}
              <input type="file" id="thumbnail" onChange={updateUrl} />
            </div>
          </FormList>
          <GalleryBtn>
            <button type="submit">제출</button>
          </GalleryBtn>
        </form>
      )}
    </FormSection>
  );
};

// 스타일
const FormSection = styled.div`
  margin: 30px;
  margin-top: 40px;
`;

const FormList = styled.div`
  padding: 10px 0;
  @media screen and (max-width: 600px) {
    padding: 5px 0;
  }
  .select__wrap {
    background-color: #fff;
    border: 1px solid #ccc;
    color: gray;
    position: relative;
    max-width: 200px;
  }
  .select__wrap:before {
    display: block;
    border-top: 6px solid gray;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    top: 15px;
    right: 10px;
    text-align: center;
    content: "";
    pointer-events: none;
  }
  .select__wrap select {
    background-color: transparent;
    border: 0 none;
    box-shadow: none;
    color: gray;
    display: block;
    font-size: 100%;
    line-height: normal;
    margin: 0;
    padding: 0.5em;
    width: 100%;
    height: 35px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .select__wrap select::-ms-expand {
    display: none;
  }
  select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  input[type="text"] {
    width: 80%;
    border: 1px solid #ccc;
    height: 35px;
    font-size: 100%;
    padding: 0 8px;
    color: gray;
  }
  .preview {
    position: relative;
    width: 200px;
    height: 100px;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 600px) {
      width: 150px;
      height: 80px;
    }
    &:after {
      content: "썸네일 수정";
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: auto;
    }
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 3;
      left: 0;
      top: 0;
    }
  }
  .quill {
    height: 300px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1200px) {
    .quill {
      height: 100%;
      margin-bottom: 0px;
    }
  }
`;

const GalleryBtn = styled.div`
  margin-top: 30px;
  text-align: center;
  button {
    background-color: var(--main-color);
    width: 95px;
    height: 35px;
    color: white;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default GalleryEdit;
