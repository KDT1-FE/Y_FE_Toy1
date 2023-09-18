import { useState, useEffect } from "react";
import * as S from "./WikiStyle";
import wikiInitData from "@/db/wiki/wikiInitData.json";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";
import { Wiki } from "./WikiType";

export default function WikiPage() {
  const [wikiData, setWikiData] = useState<Wiki[]>(wikiInitData);
  const [selectedEntry, setSelectedEntry] = useState<Wiki | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [form, setForm] = useState<Wiki>({
    wikiID: "",
    parentID: "",
    title: "",
    content: "",
    authorID: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    setWikiData(wikiInitData);
  }, []);

  function handleEntryClick(entry: Wiki) {
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
      wikiID: "",
      parentID: "",
      title: "",
      content: "",
      authorID: "",
      createdAt: "",
      updatedAt: "",
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
            WiKiList={wikiData}
            onEntryClick={handleEntryClick}
            style={{ display: showCategoryList ? "block" : "none" }}
          />
          {
            <WikiContent
              Wiki={selectedEntry}
              isEditMode={isEditMode}
              onWikiButtonClick={handleWikiButtonClick}
              toggleEditMode={toggleEditMode}
              form={form}
              onFormChange={handleFormChange}
            />
          }
        </S.Container>
      </S.WikiWrapper>
    </>
  );
}
