import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import { Timestamp } from "firebase/firestore";
import WikiContent from "@/components/wiki/content/WikiContent";
import WikiCategoryList from "@/components/wiki/category/WikiCategoryList";
import WikiTop from "@/components/wiki/top/WikiTop";
import * as S from "./WikiStyle";

import { HasChildMap, Wiki } from "../../components/wiki/types/WikiCommonType";
import { Props } from "@/App";
import {
  deleteWiki,
  deleteChildWikis,
  hasChildWikis,
  loadRootWikis,
  loadWikiByID,
  saveWiki,
  loadChildrenWikis,
} from "@/firebase/services/wikiService";

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
  const navigate = useNavigate();
  const location = useLocation();

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
    loadRootWikis().then((wikis) => {
      setWikiData(wikis);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (wikiData.length > 0 && (!selectedEntry || !form)) {
      setSelectedEntry(wikiData[0]);
      setForm(wikiData[0]);
    }
  }, [wikiData, selectedEntry, form]);

  useEffect(() => {
    if (wikiIDFromQuery !== EMPTY_STRING) {
      loadWikiByID(wikiIDFromQuery).then((wiki) => {
        if (wiki) {
          setSelectedEntry(wiki);
          setForm(wiki);
        }
      });
    }
  }, [wikiIDFromQuery]);

  function handleEntryClick(entry: Wiki) {
    setSelectedEntry(entry);
    setForm(entry);
    clearQueryParams();
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
      const childWikis = await loadChildrenWikis(parentWiki.wikiID);
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
      authorID: form.authorID || email,
      createdAt: form.createdAt || currentTime,
      updatedAt: currentTime,
      lastUpdatedBy: email,
    };
    try {
      const linkWikiID = await saveWiki(newForm);
      loadWikiByID(linkWikiID);
      setSelectedEntry(newForm);
      setForm(newForm);
      alert("위키를 저장하였습니다.");
    } catch (error) {
      console.error("Error saving wiki:", error);
      alert("위키 저장 중 오류가 발생했습니다.");
    } finally {
      loadRootWikis().then((wikis) => {
        setWikiData(wikis);
        setIsLoading(false);
        setIsEditMode(false);
        setSideMenuVisible(true);
      });
      clearQueryParams();
    }
  }

  async function handleWikiDeleteClick() {
    const deleteTargetWiki = form.wikiID;
    const hasChild = hasChildMap[deleteTargetWiki];

    let deleteConfirmMessage = "해당 위키를 삭제 하시겠습니까?";
    if (hasChild) {
      deleteConfirmMessage +=
        "\n주의: 이 위키를 삭제 할 경우, 하위 위키도 함께 삭제됩니다.";
    }

    const deleteConfirm = confirm(deleteConfirmMessage);

    if (!deleteConfirm) return;

    if (form.wikiID !== EMPTY_STRING) {
      try {
        if (hasChild) deleteChildWikis(deleteTargetWiki);
        await deleteWiki(deleteTargetWiki);

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

  function clearQueryParams() {
    navigate(location.pathname);
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
