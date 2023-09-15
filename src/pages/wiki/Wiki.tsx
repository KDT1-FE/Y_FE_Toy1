import { useState, useEffect } from "react";
import * as S from "./WikiStyle";
import wikiInitData from "@/db/wiki/wikiInitData.json";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";

type WikiEntry = {
  title: string;
  content: string;
  authorName: string;
  updatedAt: string;
};

type WikiCategory = {
  categoryName: string;
  entries: WikiEntry[];
};

export default function WikiPage() {
  const [wikiData, setWikiData] = useState<WikiCategory[]>(wikiInitData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<WikiEntry | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    authorName: "",
    updatedAt: new Date().toISOString(),
  });

  useEffect(() => {
    setWikiData(wikiInitData);

    // 첫 번째 카테고리의 첫 번째 위키 선택
    if (wikiInitData.length && wikiInitData[0].entries.length) {
      setSelectedEntry(wikiInitData[0].entries[0]);
      setForm(wikiInitData[0].entries[0]);
    }
  }, []);

  function handleEntryClick(entry: WikiEntry) {
    setSelectedEntry(entry);
    setForm(entry);
  }
  function handleWikiButtonClick() {
    setShowCategoryList(!showCategoryList);
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  function handleRegisterClick() {
    // 위키 작성 폼을 표시하는 로직
    setIsEditMode(true);
    setShowCategoryList(false);
    setForm({
      title: "",
      content: "",
      authorName: "",
      updatedAt: new Date().toISOString(),
    });
  }

  // 위키 저장
  function handleSaveClick() {
    setIsEditMode(false);
    setShowCategoryList(true);
    alert("위키를 저장했습니다.");
  }

  function handleFormChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <>
      <S.WikiWrapper>
        <WikiTop
          title="WIKI"
          isEditMode={isEditMode}
          onRegister={handleRegisterClick}
          onSave={handleSaveClick}
        ></WikiTop>
        <S.Container>
          <WikiCategoryList
            data={wikiData}
            onEntryClick={handleEntryClick}
            style={{ display: showCategoryList ? "block" : "none" }}
          />
          <WikiContent
            entry={selectedEntry}
            isEditMode={isEditMode}
            onWikiButtonClick={handleWikiButtonClick}
            toggleEditMode={toggleEditMode}
            form={form}
            onFormChange={handleFormChange}
          />
        </S.Container>
      </S.WikiWrapper>
    </>
  );
}
