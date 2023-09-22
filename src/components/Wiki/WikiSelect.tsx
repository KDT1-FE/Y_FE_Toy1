import React, { useEffect, useState, useRef } from "react";

// Style
import styled from "styled-components";

import { EllipsisOutlined } from "@ant-design/icons";
import swal from "sweetalert";

// Recoil
import { useSetRecoilState } from "recoil";
import {
  newFileState,
  editFolderState,
  deleteFolderState,
  SelectProps,
  SelectState,
} from "../../store/wiki";

// api
import { deleteFolder } from "../../hooks/Wiki/api";

interface ISelect {
  title: string;
}

const WikiSelect = ({ title }: ISelect) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const setFileState = useSetRecoilState(newFileState);
  const setFolderState = useSetRecoilState(editFolderState);
  const setDeleteFolderState = useSetRecoilState(deleteFolderState);
  const setCurrentFolder = useSetRecoilState(SelectProps);
  const setSelectState = useSetRecoilState(SelectState);
  const menuRef = useRef(null);

  const handleButtonClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleItemClick = () => {
    setMenuVisible(false);
  };

  const handleOutsideClick = () => {
    if (menuRef.current) {
      setMenuVisible(false);
      setSelectState(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuVisible]);

  return (
    <Container>
      <EllipsisOutlined onClick={handleButtonClick} />
      <CustomSelectMenu
        ref={menuRef}
        className={isMenuVisible ? "open" : "closed"}
      >
        <CustomSelectItem
          onClick={() => {
            handleItemClick();
            setCurrentFolder(title);
            if (title === "FE3 WIKI 가이드") {
              swal(
                "Fail",
                "현재 폴더는 위키 가이드 폴더이므로 새로운 파일을 생성할 수 없습니다.",
                "error",
              );
            } else {
              setFolderState((prev) => !prev);
              setCurrentFolder(title);
            }
          }}
        >
          폴더 이름 변경
        </CustomSelectItem>
        <CustomSelectItem
          onClick={() => {
            handleItemClick();
            setDeleteFolderState(true);
            deleteFolder(title, setDeleteFolderState);
          }}
        >
          폴더 삭제
        </CustomSelectItem>
        <CustomSelectItem
          onClick={() => {
            handleItemClick();
            if (title === "FE3 WIKI 가이드") {
              swal(
                "Fail",
                "현재 폴더는 위키 가이드 폴더이므로 새로운 파일을 생성할 수 없습니다.",
                "error",
              );
            } else {
              setFileState((prev) => !prev);
              setCurrentFolder(title);
            }
          }}
        >
          새로운 파일
        </CustomSelectItem>
      </CustomSelectMenu>
    </Container>
  );
};

export default WikiSelect;

const Container = styled.div`
  position: relative;
`;

const CustomSelectMenu = styled.ul`
  &.open {
    display: block;
  }
  &.closed {
    display: none;
  }
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  z-index: 999;
  width: 120px;
  padding: 0;
  margin: 0;
  margin-left: 8px;
  @media (max-width: 768px) {
    left: -110px;
  }
`;

const CustomSelectItem = styled.li`
  padding: 5px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
  font-size: 13px;
`;
