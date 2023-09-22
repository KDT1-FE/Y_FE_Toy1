// Firebase
import { db } from "../../libs/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { NewFile } from "../../components/Wiki/WikiNav";
import { TeamNewFile } from "../../components/Wiki/WikiTeamNav";

import swal from "sweetalert";

type RefreshFunction = () => void;

// 새로운 전체 폴더 생성
export const addAllFolder = async (
  folderName: string,
  refreshFc: RefreshFunction,
): Promise<void> => {
  if (folderName.length > 0) {
    const foldersRef = collection(db, "WikiPage");
    const foldersQuery = query(foldersRef);
    const foldersQuerySnapshot = await getDocs(foldersQuery);
    const existFolderNames: string[] = [];

    foldersQuerySnapshot.forEach((doc) =>
      existFolderNames.push(doc.data().title),
    );

    if (existFolderNames.includes(folderName)) {
      swal("Fail", "이미 같은 이름의 폴더가 존재합니다.", "error");
    } else {
      const order = foldersQuerySnapshot.size;

      const folderData = {
        title: folderName,
        items: [],
        order: order,
        teamName: null,
      };

      await addDoc(collection(db, "WikiPage"), folderData);

      refreshFc();
    }
  }
};

// 새로운 팀 폴더 생성
export const addTeamFolder = async (
  folderName: string,
  refreshFc: RefreshFunction,
  userTeamName: string | null,
): Promise<void> => {
  if (folderName.length > 0) {
    const foldersRef = collection(db, "WikiPage");
    const foldersQuery = query(foldersRef);
    const foldersQuerySnapshot = await getDocs(foldersQuery);
    const existFolderNames: string[] = [];

    foldersQuerySnapshot.forEach((doc) =>
      existFolderNames.push(doc.data().title),
    );

    if (existFolderNames.includes(folderName)) {
      swal("Fail", "이미 같은 이름의 폴더가 존재합니다.", "error");
    } else {
      const order = foldersQuerySnapshot.size;

      const folderData = {
        title: folderName,
        items: [],
        order: order,
        teamName: userTeamName,
      };

      await addDoc(collection(db, "WikiPage"), folderData);

      refreshFc();
    }
  }
};

// 폴더 이름 변경
export const changeFolderName = async (
  currentFolderName: string,
  newFolderName: string,
  refreshFc: RefreshFunction,
): Promise<void> => {
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
    refreshFc;
  } catch (e) {
    console.error(e);
  }
};

// 새로운 파일 생성
export const addFile = async (
  currentFileName: string,
  state: NewFile,
  refreshFc: RefreshFunction,
): Promise<void> => {
  try {
    const q = query(
      collection(db, "WikiPage"),
      where("title", "==", currentFileName),
    );
    const querySnapshot = await getDocs(q);
    const folderDoc = querySnapshot.docs[0];
    const exist = folderDoc.data().items;
    const date = new Date();
    const newFileData = {
      fileName: state.fileName,
      subName: state.subName,
      date: date,
      name: null,
      department: null,
      position: null,
      photo: null,
    };

    const order = exist.length;

    exist.push({
      ...newFileData,
      order: order,
    });

    await updateDoc(folderDoc.ref, {
      items: exist,
    });

    refreshFc();
  } catch (e) {
    console.error(e);
  }
};

// 팀 파일 생성
export const addTeamFile = async (
  currentFileName: string,
  state: TeamNewFile,
  name: null | string,
  department: null | string,
  position: null | string,
  photo: null | string,
  refreshFc: RefreshFunction,
): Promise<void> => {
  try {
    const q = query(
      collection(db, "WikiPage"),
      where("title", "==", currentFileName),
    );
    const querySnapshot = await getDocs(q);
    const folderDoc = querySnapshot.docs[0];
    const exist = folderDoc.data().items;
    const date = new Date();
    const newFileData = {
      fileName: state.fileName,
      subName: state.subName,
      date: date,
      name: name,
      department: department,
      position: position,
      photo: photo,
    };

    const order = exist.length;

    exist.push({
      ...newFileData,
      order: order,
    });

    await updateDoc(folderDoc.ref, {
      items: exist,
    });

    refreshFc();
  } catch (e) {
    console.error(e);
  }
};

// 폴더 삭제
export const deleteFolder = async (
  folderName: string,
  state: (value: boolean) => void,
) => {
  try {
    if (folderName === "FE3 WIKI 가이드") {
      swal(
        "Fail",
        "현재 폴더는 가이드 폴더이므로 삭제할 수 없습니다.",
        "error",
      );
    } else {
      const q = query(
        collection(db, "WikiPage"),
        where("title", "==", folderName),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const folderDoc = querySnapshot.docs[0];
        await deleteDoc(folderDoc.ref);
        state(false);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
