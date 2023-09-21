import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router";
import { Editor } from "@toast-ui/react-editor";
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";
import * as S from "./WikiStyle";
import { db } from "../../../firebase";
import { Wiki } from "../../components/wiki/WikiCommonType";
import { Props } from "@/App";

const EMPTY_STRING = "";
const initializeForm = () => {
  return {
    wikiID: EMPTY_STRING,
    parentID: EMPTY_STRING,
    title: EMPTY_STRING,
    content: EMPTY_STRING,
    authorID: EMPTY_STRING,
    createdAt: null,
    updatedAt: null,
    lastUpdatedBy: EMPTY_STRING,
  };
};
export default function WikiPage({ email }: Props) {
  const [wikiData, setWikiData] = useState<Wiki[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const parents = useMemo(
    () => wikiData.filter((wiki) => !wiki.parentID),
    [wikiData],
  );
  const initialFormValue = useMemo(initializeForm, []);
  const [form, setForm] = useState<Wiki>(initialFormValue);
  const [selectedEntry, setSelectedEntry] = useState<Wiki | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const unsubscribeRef = useRef<null | (() => void)>(null);

  const queryString = new URLSearchParams(useLocation().search).get("wikiID");
  const wikiIDFromQuery = queryString ? queryString : EMPTY_STRING;

  useEffect(() => {
    loadRootWikis();

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, []);

  useEffect(() => {
    if (wikiData.length > 0 && (!selectedEntry || !form)) {
      setSelectedEntry(wikiData[0]);
      setForm(wikiData[0]);
    }
  }, [wikiData, selectedEntry, form]);
  useEffect(() => {
    if (wikiIDFromQuery !== EMPTY_STRING) {
      loadWikiByID(wikiIDFromQuery);
    }
  }, [wikiIDFromQuery]);

  async function loadWikiByID(id: string) {
    const wikiRef = doc(db, "Wiki", id);
    const wikiSnap = await getDoc(wikiRef);
    if (wikiSnap.exists()) {
      const wiki = wikiSnap.data() as Wiki;
      setSelectedEntry(wiki);
      setForm(wiki);
    } else {
      console.warn(`Wiki ID ${id}가 존재하지 않습니다.`);
    }
  }

  function loadRootWikis() {
    const q = query(
      collection(db, "Wiki"),
      where("parentID", "==", EMPTY_STRING),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWikiData(snapshot.docs.map((doc) => doc.data() as Wiki));
      setIsLoading(false);
    });

    unsubscribeRef.current = unsubscribe;
  }

  function handleEntryClick(entry: Wiki) {
    setSelectedEntry(entry);
    setForm(entry);
  }

  function toggleChildWikis(parentWiki: Wiki) {
    const existingChildWikis = wikiData.filter(
      (wiki) => wiki.parentID === parentWiki.wikiID,
    );

    if (existingChildWikis.length > 0) {
      // 이미 로드된 자식 위키들은 숨기거나 보여줌
      setWikiData((prev) => {
        const parentIndex = prev.findIndex(
          (wiki) => wiki.wikiID === parentWiki.wikiID,
        );
        if (
          parentIndex !== -1 &&
          prev[parentIndex + 1] &&
          prev[parentIndex + 1].parentID === parentWiki.wikiID
        ) {
          // 이미 자식 위키들이 추가되어 있으므로 숨기기
          return [
            ...prev.slice(0, parentIndex + 1),
            ...prev.slice(parentIndex + 1 + existingChildWikis.length),
          ];
        } else {
          // 자식 위키들 추가
          return [
            ...prev.slice(0, parentIndex + 1),
            ...existingChildWikis,
            ...prev.slice(parentIndex + 1),
          ];
        }
      });
    } else {
      const q = query(
        collection(db, "Wiki"),
        where("parentID", "==", parentWiki.wikiID),
      );

      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const childWikis = snapshot.docs.map((doc) => doc.data() as Wiki);

        // 중복된 데이터가 없도록 업데이트
        setWikiData((prev) => {
          const parentIndex = prev.findIndex(
            (wiki) => wiki.wikiID === parentWiki.wikiID,
          );

          // 중복된 데이터를 체크
          const uniqueChildWikis = childWikis.filter(
            (child) => !prev.some((wiki) => wiki.wikiID === child.wikiID),
          );

          return [
            ...prev.slice(0, parentIndex + 1),
            ...uniqueChildWikis,
            ...prev.slice(parentIndex + 1 + existingChildWikis.length),
          ];
        });
      });

      // 새로운 구독을 추적
      unsubscribeRef.current = unsubscribe;
    }
  }

  function handleWikiEditButtonClick() {
    setSideMenuVisible(!sideMenuVisible);
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  function handleRegisterClick() {
    setIsEditMode(true);
    setSideMenuVisible(false);
    setForm(initializeForm());
  }

  async function handleSaveClick() {
    setIsEditMode(false);
    setSideMenuVisible(true);

    const markDownContent =
      editorRef.current?.getInstance().getMarkdown() || EMPTY_STRING;
    const currentTime = Timestamp.now();

    const newForm = {
      ...form,
      content: markDownContent,
      authorID: email,
      createdAt: form.createdAt || currentTime,
      updatedAt: currentTime,
      lastUpdatedBy: email,
    };

    try {
      if (newForm.wikiID && newForm.wikiID !== EMPTY_STRING) {
        const wikiRef = doc(db, "Wiki", newForm.wikiID);
        await setDoc(wikiRef, newForm, { merge: true });
      } else {
        const wikiCollection = collection(db, "Wiki");
        const newDocRef = await addDoc(wikiCollection, newForm);

        // Firestore에서 자동으로 생성된 문서 ID를 가져옴
        const generatedID = newDocRef.id;

        // 생성된 ID를 newForm의 wikiID에 할당하고 다시 저장
        await setDoc(
          newDocRef,
          { ...newForm, wikiID: generatedID },
          { merge: true },
        );
      }
      alert("위키를 저장했습니다.");
    } catch (error) {
      console.error("Error saving wiki:", error);
      alert("위키 저장 중 오류가 발생했습니다.");
    }
  }

  async function handleWikiDeleteClick() {
    const childWikis = wikiData.filter((wiki) => wiki.parentID === form.wikiID);

    let deleteConfirmMessage = "해당 위키를 삭제 하시겠습니까?";
    if (childWikis.length > 0) {
      deleteConfirmMessage +=
        "\n주의: 이 위키를 삭제 할 경우, 하위 위키도 함께 삭제됩니다.";
    }

    const deleteConfirm = confirm(deleteConfirmMessage);

    if (!deleteConfirm) return;

    if (form.wikiID !== EMPTY_STRING) {
      try {
        for (const childWiki of childWikis) {
          const childWikiRef = doc(db, "Wiki", childWiki.wikiID);
          await deleteDoc(childWikiRef);
        }

        const wikiRef = doc(db, "Wiki", form.wikiID);
        await deleteDoc(wikiRef);

        alert("위키를 삭제하였습니다.");
      } catch (error) {
        console.error("Error deleting wiki:", error);
        alert("위키 삭제 중 오류가 발생했습니다.");
      }
    }
  }

  function handleFormChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleBackClick() {
    setIsEditMode(false);
    setSideMenuVisible(true);
  }

  return (
    <>
      <S.WikiWrapper>
        <WikiTop
          title="WIKI"
          isEditMode={isEditMode}
          onRegister={handleRegisterClick}
          onSave={handleSaveClick}
          isBackButtonVisible={!sideMenuVisible}
          onBack={handleBackClick}
        ></WikiTop>
        <S.Container>
          <WikiCategoryList
            WiKiList={wikiData}
            onEntryClick={handleEntryClick}
            onArrowClick={toggleChildWikis}
            isVisible={sideMenuVisible}
          />
          {
            <WikiContent
              currentUser={email}
              Wiki={selectedEntry}
              form={form}
              parents={parents}
              editorRef={editorRef}
              isEditMode={isEditMode}
              isLoading={isLoading}
              onWikiEditButtonClick={handleWikiEditButtonClick}
              onWikiDeleteButtonClick={handleWikiDeleteClick}
              toggleEditMode={toggleEditMode}
              onFormChange={handleFormChange}
            />
          }
        </S.Container>
      </S.WikiWrapper>
    </>
  );
}
