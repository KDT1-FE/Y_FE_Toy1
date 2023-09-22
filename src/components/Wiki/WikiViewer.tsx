import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";

// Components
import WikiEditor from "./WikiEditor";

// Toast UI Editor
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

// Style
import styled from "styled-components";
import { Button, Space, Input, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import swal from "sweetalert";

// Recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentFolderTitle,
  currentFileTitle,
  currentItem,
  totalItems,
  totalTeamItems,
  editFileState,
  editFileSubName,
  userTeamName,
} from "../../store/wiki";

// Firebase
import { db } from "../../libs/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";

// Interface
import { IItem } from "./WikiSubPage";
import { IItems } from "../../store/wiki";
import { IWiki } from "../../store/wiki";

interface IContent {
  content: IItem;
}

const WikiViewer = ({ content }: IContent) => {
  const { fileName, subName, date, name, position, department, photo } =
    content;

  const prevSubNameRef = useRef<string | null>(null);
  const prevNameRef = useRef<string | null>(null);

  const [renderKey, setRenderKey] = useState(0);
  const [editState, setEditState] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(fileName);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const [currentFile, setCurrentFile] = useRecoilState(currentFileTitle);
  const [editFile, setEditFile] = useRecoilState(editFileState);
  const currentFolder = useRecoilValue(currentFolderTitle);
  const userTeam = useRecoilValue(userTeamName);

  const setItem = useSetRecoilState(currentItem);
  const setItems = useSetRecoilState(totalItems);
  const setTeamItems = useSetRecoilState(totalTeamItems);
  const setExistSub = useSetRecoilState(editFileSubName);

  const isTeamFile = !!name;

  const postEditTitle = async (newData: string) => {
    try {
      const q = query(
        collection(db, "WikiPage"),
        where("title", "==", currentFolder),
      );
      const querySnapshot = await getDocs(q);
      const FolderDoc = querySnapshot.docs[0];

      const items = FolderDoc.data().items;
      const itemIndex = items.findIndex(
        (item: IItems) => item.fileName === currentFile,
      );

      if (itemIndex !== -1) {
        items[itemIndex].fileName = newData;

        const data = {
          items: items,
        };

        await updateDoc(FolderDoc.ref, data);

        setItem(items[itemIndex]);
        setCurrentFile(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 삭제 권한(position === "Manager")일 경우 부여 => 임시 해제(테스트용)
  const postDelete = async () => {
    try {
      if (currentFolder === "FE3 WIKI 가이드") {
        swal(
          "Fail",
          "현재 파일은 위키 가이드 파일이므로 삭제할 수 없습니다",
          "error",
        );
      } else {
        const q = query(
          collection(db, "WikiPage"),
          where("title", "==", currentFolder),
        );
        const querySnapshot = await getDocs(q);
        const FolderDoc = querySnapshot.docs[0];

        const items = FolderDoc.data().items;
        const itemIndex = items.findIndex(
          (item: IItems) => item.fileName === currentFile,
        );
        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);

          const data = {
            items: items,
          };

          await updateDoc(FolderDoc.ref, data);
          setCurrentFile("");
        }
      }
    } catch (error) {
      console.error("파일 삭제 중 오류 발생:", error);
    }
  };

  const refreshTotalFolder = async () => {
    const q = query(
      collection(db, "WikiPage"),
      orderBy("order"),
      where("teamName", "==", null),
    );
    const querySnapshot = await getDocs(q);

    const totalFileData = querySnapshot.docs.map((doc) => doc.data() as IWiki);
    setItems(totalFileData);
  };

  const refreshTeamFolder = async () => {
    const t = query(
      collection(db, "WikiPage"),
      where("teamName", "==", userTeam),
      orderBy("order"),
    );
    const teamQuerySnapshot = await getDocs(t);

    const teamFileData = teamQuerySnapshot.docs.map(
      (doc) => doc.data() as IWiki,
    );
    setTeamItems(teamFileData);
  };

  const onSubmitEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isTeamFile) {
      await postEditTitle(editTitle);
      setEditState(false);
      refreshTeamFolder();
    } else {
      await postEditTitle(editTitle);
      setEditState(false);
      refreshTotalFolder();
    }
  };

  const onClickEdit = () => {
    if (currentFolder === "FE3 WIKI 가이드") {
      swal(
        "Fail",
        "현재 파일은 위키 가이드 파일이므로 제목을 수정할 수 없습니다.",
        "error",
      );
    } else {
      setEditState(true);
    }
  };

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const onClickSubEdit = () => {
    if (currentFolder === "FE3 WIKI 가이드") {
      swal(
        "Fail",
        "현재 파일은 위키 가이드 파일이므로 내용을 수정할 수 없습니다.",
        "error",
      );
    } else {
      setEditFile(true);
      setExistSub(subName);
    }
  };

  useEffect(() => {
    if (prevSubNameRef.current !== subName) {
      prevSubNameRef.current = subName;
      setRenderKey((prev) => prev + 1);
    }
    if (prevNameRef.current !== fileName) {
      prevNameRef.current = fileName;
      setRenderKey((prev) => prev + 1);
    }
  }, [subName, fileName]);

  useEffect(() => {
    console.log("editFile 현재: ", editFile);
  }, [editFile, editFileState]);

  useEffect(() => {
    if (date) {
      const year = date.toDate().getFullYear();
      const month = date.toDate().getMonth() + 1;
      const day = date.toDate().getDate();
      const hours = date.toDate().getHours();
      const minutes = date.toDate().getMinutes();

      const formatDate = `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
      setFormattedDate(formatDate);

      if (name) {
        const formatUserDate = `${month}월 ${day}일`;
        setFormattedDate(formatUserDate);
      }
    }
  }, [date]);

  return (
    <Container>
      {editFile === false ? (
        <>
          <StyledDiv>
            <div>
              {!editState ? (
                <>
                  <h1>{fileName}</h1>
                  <EditOutlined
                    style={{
                      marginTop: "12px",
                      cursor: "pointer",
                    }}
                    onClick={onClickEdit}
                  />
                </>
              ) : (
                <form onSubmit={onSubmitEdit}>
                  <Input placeholder={fileName} onChange={onChangeEdit} />
                </form>
              )}
            </div>
            <Space wrap>
              <Button onClick={onClickSubEdit}>수정</Button>
              <Button onClick={postDelete}>삭제</Button>
            </Space>
          </StyledDiv>
          {name ? (
            <UserContainer>
              {photo ? (
                <Space
                  wrap
                  size={16}
                  style={{ marginRight: "14px", marginTop: "2px" }}
                >
                  <Avatar size={38} src={photo} style={{ opacity: "1" }} />
                </Space>
              ) : (
                <Space wrap size={16} style={{ marginRight: "14px" }}>
                  <Avatar size={38} icon={<UserOutlined />} />
                </Space>
              )}
              <div>
                <div style={{ fontWeight: "600" }}>{name}</div>
                <StyledSpan>
                  <span>{department} - </span>
                  <span>{position} • </span>
                  <span>{formattedDate}</span>
                </StyledSpan>
              </div>
            </UserContainer>
          ) : (
            <StyledDate>최종 수정일 : {formattedDate}</StyledDate>
          )}

          <StyledViewer>
            <Viewer key={renderKey} initialValue={subName} />
          </StyledViewer>
        </>
      ) : (
        <WikiEditor />
      )}
    </Container>
  );
};

export default WikiViewer;

const Container = styled.div`
  width: 95%;
  margin-top: -20px;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    h1 {
      margin-right: 10px;
    }
  }
  form {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`;
const StyledViewer = styled.div`
  font-size: 1rem !important;
  margin-top: 30px;
`;
const StyledDate = styled.div`
  opacity: 0.5;
  font-size: 0.75rem;
  margin-top: -10px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSpan = styled.div`
  margin-top: 3px;
  span {
    font-size: 12px;
  }
`;
