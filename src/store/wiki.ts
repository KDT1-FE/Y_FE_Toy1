import { atom } from "recoil";

import { Timestamp } from "firebase/firestore";

export interface IWikiItem {
  fileName: string;
  subName: string;
  date: Timestamp;
  name: null | string;
  department: null | string;
  position: null | string;
  photo: null | string;
}

export interface IWiki {
  title: string;
  order: number;
  items: IWikiItem[];
  teamName: null | string;
}

// 현재 선택한 폴더명
export const currentFolderTitle = atom<string>({
  key: "curFolderTitle",
  default: "",
});

// 현재 선택한 파일명
export const currentFileTitle = atom<string>({
  key: "curFileTitle",
  default: "",
});

// 전역 Item 속성 관리
export interface IItems {
  fileName: string;
  subName: string;
}

export const currentItem = atom<IItems>({
  key: "curItemState",
  default: { fileName: "", subName: "" },
});

// 전체 Item
export const totalItems = atom<IWiki[]>({
  key: "navItemList",
  default: [
    {
      title: "",
      order: 0,
      teamName: null,
      items: [
        {
          fileName: "",
          subName: "",
          date: Timestamp.fromDate(new Date()),
          name: null,
          department: null,
          position: null,
          photo: null,
        },
      ],
    },
  ],
});

// 팀 Item
export const totalTeamItems = atom<IWiki[]>({
  key: "navTeamItemList",
  default: [
    {
      title: "",
      order: 0,
      teamName: "",
      items: [
        {
          fileName: "",
          subName: "",
          date: Timestamp.fromDate(new Date()),
          name: "",
          department: "",
          position: "",
          photo: "",
        },
      ],
    },
  ],
});

// 폴더 이름 변경 상태
export const editFolderState = atom<boolean>({
  key: "isFolderState",
  default: false,
});

// 폴더 이름 변경
export const newFolderName = atom<string>({
  key: "newFolderTitle",
  default: "",
});

// 폴더 삭제 상태
export const deleteFolderState = atom<boolean>({
  key: "isFolderDeleteState",
  default: false,
});

// 새 파일 생성
export const newFileState = atom<boolean>({
  key: "nwFileState",
  default: false,
});

// 파일 이름 변경
export const editFileState = atom<boolean>({
  key: "isFileState",
  default: false,
});

// 파일 데이터 수정
export const editFileSubName = atom<string>({
  key: "ediFiSub",
  default: "",
});

// Select 클릭시 현재 요소 전달
export const SelectProps = atom<string | null>({
  key: "selProps",
  default: null,
});

// Select 외부 영역 클릭 상태 관리
export const SelectState = atom<boolean>({
  key: "isClickOutsideState",
  default: false,
});

export const userTeamName = atom<string>({
  key: "userTeamName",
  default: "",
});
