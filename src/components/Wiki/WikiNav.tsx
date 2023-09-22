import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useRef,
} from "react";

// Components
import WikiSelect from "./WikiSelect";
import WikiTeamNav from "./WikiTeamNav";

// Style
import styled from "styled-components";

import {
  FolderOutlined,
  FileOutlined,
  FolderAddOutlined,
  TeamOutlined,
  LockOutlined,
  UnlockOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

// Recoil
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  currentFolderTitle,
  currentFileTitle,
  totalItems,
  newFileState,
  editFolderState,
  deleteFolderState,
  SelectProps,
  SelectState,
  userTeamName,
} from "../../store/wiki";

// Firebase
import { db } from "../../libs/firebase";
import {
  collection,
  query,
  where,
  setDoc,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";

// api
import { addFile, addAllFolder } from "../../hooks/Wiki/api";

// Interface
import { IWiki } from "../../store/wiki";

// React-Beautiful-Dnd
import { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import swal from "sweetalert";

export interface NewFile {
  fileName: string;
  subName: string;
  name: null;
  department: null;
  position: null;
  photo: null;
}

export interface ITeamProps {
  name: string | null;
  department: string | null;
  position: string | null;
  photo: string | null;
}

const WikiNav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>();

  const [newFolder, setNewFolder] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [newFile, setNewFile] = useState<NewFile>({
    fileName: "",
    subName: "",
    name: null,
    department: null,
    position: null,
    photo: null,
  });
  const [inputState, setInputState] = useState<boolean>(false);
  const [isWikiSelectOpen, setIsWikiSelectOpen] = useRecoilState(SelectState);
  const [items, setItems] = useRecoilState(totalItems);
  const [currentFolder, setCurrentFolder] = useRecoilState(SelectProps);
  const [currentTargetFile, setCurrentTargetFile] =
    useRecoilState(currentFileTitle);
  const [fileState, setFileState] = useRecoilState(newFileState);
  const [folderState, setFolderState] = useRecoilState(editFolderState);
  const setCurrentTarget = useSetRecoilState(currentFolderTitle);
  const deleteState = useRecoilValue(deleteFolderState);

  const [teamName, setTeamName] = useState<string | null>("");
  const [teamInfo, setTeamInfo] = useState<ITeamProps | null>(null);
  const setUserTeam = useSetRecoilState(userTeamName);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [authState, setAuthState] = useState<boolean>(false);
  const [hideFolder, setHideFolder] = useState<boolean>(false);

  const refreshFolders = async () => {
    const q = query(
      collection(db, "WikiPage"),
      orderBy("order"),
      where("teamName", "==", null),
    );
    const querySnapshot = await getDocs(q);

    const folderData = querySnapshot.docs.map((doc) => doc.data() as IWiki);
    setItems(folderData);
  };

  const changeFolderName = async (
    currentFolderName: string,
    newFolderName: string,
  ) => {
    try {
      const q = query(
        collection(db, "WikiPage"),
        where("title", "==", currentFolderName),
      );
      const querySnapshot = await getDocs(q);
      const folderDoc = querySnapshot.docs[0];
      if (folderDoc) {
        await updateDoc(folderDoc.ref, {
          title: newFolderName,
        });
      }
      refreshFolders();
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmitFolder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addAllFolder(newFolder, refreshFolders);
    setInputState(false);
    setNewFolder("");
  };

  const onChangeFolder = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFolder(e.target.value);
  };

  // console.log(1)

  const onSubmitFile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFile.fileName !== "") {
      if (currentFolder) addFile(currentFolder, newFile, refreshFolders);
      setFileState(false);
    } else {
      swal("Fail", "파일의 이름을 입력해주세요", "error");
      setFileState(false);
    }
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFile({ ...newFile, fileName: e.target.value });
  };

  const handleFolderClick = (current: string) => {
    if (!fileState) {
      setCurrentFolder((prev) => (prev === current ? null : current));
      if (currentFolder) setCurrentTarget(currentFolder);
    }
  };

  const handleFileClick = (current: string) => {
    setCurrentTargetFile(current);
    setFileState(false);
  };

  const handleLiClick = (item: string) => {
    if (!isWikiSelectOpen) {
      handleFolderClick(item);
    }
  };

  const handleWikiSelectToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWikiSelectOpen((prev) => !prev);
  };

  const onSubmitFolderName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentFolder && folderName.trim() !== "") {
      changeFolderName(currentFolder, folderName);
      setFolderState(false);
    }
  };

  const onChangeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const itemsCopy = [...items];
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setItems(itemsCopy);

    const foldersRef = collection(db, "WikiPage");
    const querySnapshot = await getDocs(query(foldersRef, orderBy("order")));

    const newItems = itemsCopy.map((item, index) => ({
      ...item,
      order: index,
    }));

    const batch: Promise<void>[] = [];

    querySnapshot.forEach((doc) => {
      const newItem = newItems.find((item) => item.title === doc.data().title);
      if (newItem) {
        batch.push(setDoc(doc.ref, newItem));
      }
    });

    await Promise.all(batch);
  };

  // 유저 검증 및 팀 확인
  const validTeamUser = async () => {
    try {
      const userDataString = localStorage.getItem("userData");
      const isAuthStateString = localStorage.getItem("recoil-persist");

      if (userDataString && isAuthStateString) {
        const userData = await JSON.parse(userDataString);
        const isAuthState = await JSON.parse(isAuthStateString);
        setUserUid(userData.userUid);
        setAuthState(isAuthState.authstate);

        const q = query(
          collection(db, "Teams"),
          where("userId", "array-contains", userUid),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const teamName = querySnapshot.docs[0].data().teamName;
          if (teamName) {
            setTeamName(teamName);
            setUserTeam(teamName);
            setTeamInfo({
              name: userData.newUser.name,
              department: userData.newUser.department,
              position: userData.newUser.position,
              photo: userData.newUser.photo,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fileState === true) {
      setNewFile({ ...newFile, fileName: "" });
      console.log("working: ", newFile);
    }
  }, [fileState]);

  useEffect(() => {
    setNavHeight(navRef.current?.offsetHeight);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHideFolder(true);
      } else {
        setHideFolder(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    validTeamUser();
    refreshFolders();
  }, [userUid, authState]);

  useEffect(() => {
    refreshFolders();
    validTeamUser();
  }, [currentTargetFile, deleteState]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="folders">
        {(provided) => (
          <Container ref={navRef} $navHeight={navHeight ?? 530}>
            <StyledContainer>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FolderWrapper>
                  <TeamOutlined />
                  <StyledFolderTitle>전체</StyledFolderTitle>
                </FolderWrapper>
                <CaretDownOutlined
                  style={{
                    fontSize: "9px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setHideFolder((prev) => !prev);
                  }}
                />
              </div>

              <StyledDiv>
                <StyledForm
                  onClick={() => {
                    setInputState((prev) => !prev);
                  }}
                >
                  <FolderAddOutlined
                    style={{ color: "white", fontSize: "15px" }}
                  />
                  <FormSpan>새 폴더 추가</FormSpan>
                </StyledForm>
                {inputState && (
                  <NewFolderContainer>
                    <form onSubmit={onSubmitFolder}>
                      <Input
                        placeholder="새 폴더명을 입력해주세요"
                        value={newFolder}
                        onChange={onChangeFolder}
                        style={{
                          padding: "6.5px",
                          borderRadius: "0",
                          border: "none",
                          borderBottom: "1px solid rgba(0,0,0,0.1)",
                          paddingLeft: "25px",
                        }}
                      />
                    </form>
                  </NewFolderContainer>
                )}
              </StyledDiv>
              <HideDiv $hideFolder={hideFolder}>
                <StyledUl {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item, index: number) => (
                    <Draggable
                      key={item.title}
                      draggableId={item.title + index}
                      index={index}
                    >
                      {(provided) => (
                        <div key={item.title + index}>
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleLiClick(item.title)}
                          >
                            <StyledTitle>
                              <div>
                                {(folderState && currentFolder) ===
                                item.title ? (
                                  <form onSubmit={onSubmitFolderName}>
                                    <Input
                                      defaultValue={item.title}
                                      onChange={onChangeFolderName}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </form>
                                ) : (
                                  <>
                                    <FolderOutlined />
                                    <StyledSpan>{item.title}</StyledSpan>
                                  </>
                                )}
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWikiSelectToggle(e);
                                }}
                              >
                                <WikiSelect title={item.title} />
                              </div>
                            </StyledTitle>
                            <StyledFile
                              className={
                                item.title === currentFolder ? "open" : "closed"
                              }
                            >
                              {fileState && (
                                <FormContainer>
                                  <FileOutlined style={{ fontSize: "14px" }} />
                                  <FileForm onSubmit={onSubmitFile}>
                                    <Input
                                      placeholder="새로운 파일"
                                      onChange={onChangeFile}
                                    />
                                  </FileForm>
                                </FormContainer>
                              )}
                              {item.items &&
                                item.items.map((v, fileIndex: number) => (
                                  <StyledItem
                                    key={v.fileName + fileIndex}
                                    onClick={() => handleFileClick(v.fileName)}
                                  >
                                    <div>
                                      <FileOutlined />
                                      <StyledSpan>{v.fileName}</StyledSpan>
                                    </div>
                                  </StyledItem>
                                ))}
                            </StyledFile>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </StyledUl>
              </HideDiv>
            </StyledContainer>
            <StyledTeamContainer>
              <FolderWrapper>
                {userUid ? <UnlockOutlined /> : <LockOutlined />}
                <StyledFolderTitle>
                  <span>팀 &nbsp;&nbsp;</span>
                  {userUid ? (
                    <span>{teamName}</span>
                  ) : (
                    <span>로그인을 해주세요</span>
                  )}
                </StyledFolderTitle>
              </FolderWrapper>
            </StyledTeamContainer>
            {teamName !== null && teamInfo !== null ? (
              <WikiTeamNav teamName={teamName} teamInfos={teamInfo} />
            ) : null}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default WikiNav;

const HideDiv = styled.div<{ $hideFolder: boolean }>`
  opacity: ${(props) => (props.$hideFolder ? "0" : "1")};
  max-height: ${(props) => (props.$hideFolder ? "0" : "auto")};
  visibility: ${(props) => (props.$hideFolder ? "hidden" : "visible")};
  transition:
    max-height 0.3s,
    opacity 0.3s;
    visibility 0.3s;
`;

const Container = styled.div<{ $navHeight: number }>`
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  margin: 0;
  padding: 0;
  margin-right: 30px;
  margin-bottom: 30px;
  width: 280px;
  background-color: rgba(0, 0, 0, 0.01);
  border-right: 0.1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FolderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 3px;
  margin-bottom: 8px;
  color: black;
  opacity: 0.7;
  padding-bottom: 5px;
  padding-top: 3px;
`;

const StyledFolderTitle = styled.div`
  font-size: 13px;
  font-weight: 900;
  padding-left: 5px;
`;

const StyledDiv = styled.div`
  margin-bottom: 0;
`;

const NewFolderContainer = styled.div`
  margin-top: 5px;
`;

const StyledUl = styled.ul`
  list-style: none;
  height: 80%;
  margin: 0;
  padding: 0;
  width: 100%;
  cursor: pointer;
`;

const StyledTitle = styled.div`
  margin-top: 10px;
  font-size: 14.5px;
  padding: 10px;
  padding-left: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  button {
    all: unset;
    font-size: 10.8px;
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 7px;
    z-index: 3;
    transition: font-size 0.3s;
    padding-right: 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      transition: background-color 0.3s;
    }
  }
`;

const StyledForm = styled.div`
  background-color: #6c63ff;
  padding: 13px;
  padding-left: 25px;
  cursor: pointer;
`;
const FormSpan = styled.span`
  margin-left: 10px;
  color: white;
  font-size: 13px;
  font-weight: 900;
`;

const StyledSpan = styled.span`
  margin-left: 6px;
  line-height: 10px;
`;

const StyledFile = styled.ul`
  list-style: none;
  cursor: pointer;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.85);
  &.open {
    max-height: 500px;
    div {
      opacity: 1;
      visibility: visible;
    }
  }
  &.closed {
    max-height: 0;
    opacity: 0;
    visibility: hidden;
  }
  overflow: hidden;
  transition:
    max-height 0.3s,
    opacity 0.3s;
    visibility 0.3s;
  div {
    transition: opacity 0.3s, visibility 0.3s;
  }
`;

const StyledItem = styled.li`
  width: 85%;
  padding: 3px;
  padding-bottom: 5px;
  padding-left: 4px;
  margin-bottom: 8.5px;
  margin-top: 3px;
  font-size: 13.8px;
  &:hover {
    color: blue;
    transition: all 1s;
  }
`;

const FormContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: 3.6px;
`;

const FileForm = styled.form`
  margin-left: 5px;
  input {
    all: unset;
    border: none;
    font-size: 14px;
  }
`;

const StyledTeamContainer = styled.div`
  margin-right: 30px;
  width: 280px;
  background-color: rgba(0, 0, 0, 0.01);
  border-right: 0.1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
