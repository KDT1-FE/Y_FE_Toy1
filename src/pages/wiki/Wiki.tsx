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
  orderBy,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";
import * as S from "./WikiStyle";
import { db } from "@/firebase/firebase";
import { HasChildMap, Wiki } from "../../components/wiki/WikiCommonType";
import { Props } from "@/App";
import { hasChildWikis } from "@/firebase/services/wikiService";

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
  const parents = wikiData.filter((wiki) => !wiki.parentID);
  const initialFormValue = useMemo(initializeForm, []);
  const [form, setForm] = useState<Wiki>(initialFormValue);
  const [selectedEntry, setSelectedEntry] = useState<Wiki | null>(null);
  const editorRef = useRef<Editor | null>(null);

  const queryString = new URLSearchParams(useLocation().search).get("wikiID");
  const wikiIDFromQuery = queryString ? queryString : EMPTY_STRING;

  const [hasChildMap, setHasChildMap] = useState<HasChildMap>({});

  useEffect(() => {
    const fetchChildrenStatus = async () => {
      const promises = wikiData.map(async (wiki) => {
        return wiki.parentID === EMPTY_STRING
          ? { [wiki.wikiID]: await hasChildWikis(wiki.wikiID) }
          : { [wiki.wikiID]: false };
      });

      const results = await Promise.all(promises);
      const newMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setHasChildMap(newMap);
    };

    fetchChildrenStatus();
  }, [wikiData]);

  useEffect(() => {
    loadRootWikis();
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

  async function loadRootWikis() {
    const q = query(
      collection(db, "Wiki"),
      where("parentID", "==", EMPTY_STRING),
      orderBy("createdAt", "asc"),
    );
    const docs = await getDocs(q);

    const wikis = docs.docs.map((doc) => doc.data() as Wiki);
    setWikiData(wikis);
    setIsLoading(false);
  }
  function handleEntryClick(entry: Wiki) {
    setSelectedEntry(entry);
    setForm(entry);
  }

  async function toggleChildWikis(parentWiki: Wiki) {
    const existingChildWikis = wikiData.filter(
      (wiki) => wiki.parentID === parentWiki.wikiID,
    );
    if (existingChildWikis.length > 0) {
      setWikiData((prev) => {
        const parentIndex = prev.findIndex(
          (wiki) => wiki.wikiID === parentWiki.wikiID,
        );
        if (
          parentIndex !== -1 &&
          prev[parentIndex + 1] &&
          prev[parentIndex + 1].parentID === parentWiki.wikiID
        ) {
          return [
            ...prev.slice(0, parentIndex + 1),
            ...prev.slice(parentIndex + 1 + existingChildWikis.length),
          ];
        } else {
          return [
            ...prev.slice(0, parentIndex + 1),
            ...existingChildWikis,
            ...prev.slice(parentIndex + 1),
          ];
        }
      });
    } else {
      console.log("call");
      const q = query(
        collection(db, "Wiki"),
        where("parentID", "==", parentWiki.wikiID),
        orderBy("createdAt", "asc"),
      );
      const docs = await getDocs(q);

      const childWikis = docs.docs.map((doc) => doc.data() as Wiki);
      setWikiData((prev) => {
        const parentIndex = prev.findIndex(
          (wiki) => wiki.wikiID === parentWiki.wikiID,
        );
        return [
          ...prev.slice(0, parentIndex + 1),
          ...childWikis,
          ...prev.slice(parentIndex + 1),
        ];
      });
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
      let linkWikiID;
      if (newForm.wikiID && newForm.wikiID !== EMPTY_STRING) {
        const wikiRef = doc(db, "Wiki", newForm.wikiID);
        await setDoc(wikiRef, newForm, { merge: true });
        linkWikiID = newForm.wikiID;
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
        linkWikiID = generatedID;
      }
      loadWikiByID(linkWikiID);
      setSelectedEntry(newForm);
      setForm(newForm);
      alert("위키를 저장하였습니다.");
    } catch (error) {
      console.error("Error saving wiki:", error);
      alert("위키 저장 중 오류가 발생했습니다.");
    } finally {
      loadRootWikis();
      setIsEditMode(false);
      setSideMenuVisible(true);
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

        setWikiData((prev) =>
          prev.filter(
            (wiki) =>
              wiki.wikiID !== form.wikiID && wiki.parentID !== form.wikiID,
          ),
        );

        if (wikiData.length > 0) {
          setSelectedEntry(wikiData[0]);
          setForm(wikiData[0]);
        } else {
          setSelectedEntry(null);
          setForm(initializeForm());
        }

        alert("위키를 삭제하였습니다.");
      } catch (error) {
        console.error("Error deleting wiki:", error);
        alert("위키 삭제 중 오류가 발생했습니다.");
      } finally {
        setIsEditMode(false);
        setSideMenuVisible(true);
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
            hasChildMap={hasChildMap}
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
              hasChildMap={hasChildMap}
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
