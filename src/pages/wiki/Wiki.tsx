import { useState, useEffect, useRef } from "react";
import * as S from "./WikiStyle";
import wikiInitData from "@/db/wiki/wikiInitData.json";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";
import { Wiki } from "./WikiType";
import { Editor } from "@toast-ui/react-editor";

export default function WikiPage() {
  const [wikiData, setWikiData] = useState<Wiki[]>(wikiInitData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const firstParentWiki = wikiInitData.find((wiki) => !wiki.parentID) || null;
  const parents = wikiData.filter((wiki) => !wiki.parentID);
  const initialFormValue = firstParentWiki
    ? firstParentWiki
    : {
        wikiID: "",
        parentID: "",
        title: "",
        content: "",
        authorID: "",
        createdAt: "",
        updatedAt: "",
      };
  const [form, setForm] = useState<Wiki>(initialFormValue);
  const [displayedWikis, setDisplayedWikis] = useState<Wiki[]>(
    wikiData.filter((wiki) => !wiki.parentID),
  );
  const [selectedEntry, setSelectedEntry] = useState<Wiki | null>(
    firstParentWiki,
  );
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    setWikiData(wikiInitData);
  }, []);

  function toggleChildWikis(parentWiki: Wiki) {
    const childWikis = wikiData.filter(
      (wiki) => wiki.parentID === parentWiki.wikiID,
    );

    setDisplayedWikis((prev) => {
      const newDisplayedWikis = [...prev];
      const parentIndex = newDisplayedWikis.findIndex(
        (wiki) => wiki.wikiID === parentWiki.wikiID,
      );

      if (
        newDisplayedWikis[parentIndex + 1] &&
        newDisplayedWikis[parentIndex + 1].parentID === parentWiki.wikiID
      ) {
        let childIndex = parentIndex + 1;
        while (
          newDisplayedWikis[childIndex] &&
          newDisplayedWikis[childIndex].parentID === parentWiki.wikiID
        ) {
          childIndex++;
        }
        newDisplayedWikis.splice(parentIndex + 1, childIndex - parentIndex - 1);
      } else {
        newDisplayedWikis.splice(parentIndex + 1, 0, ...childWikis);
      }
      return newDisplayedWikis;
    });
  }

  function handleEntryClick(entry: Wiki) {
    setSelectedEntry(entry);
    setForm(entry);
  }
  function handleWikiEditButtonClick() {
    setShowCategoryList(!showCategoryList);
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  function handleRegisterClick() {
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

  function handleSaveClick() {
    setIsEditMode(false);
    setShowCategoryList(true);
    alert("위키를 저장했습니다.");
    //markdown 내용
    const markDownContent = editorRef.current?.getInstance().getMarkdown();
    console.log(markDownContent);
  }

  function handleWikiDeleteClick() {
    confirm("해당 위키를 삭제 하시겠습니까?");
  }

  function handleFormChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  console.log(form);

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
            WiKiList={displayedWikis}
            onEntryClick={handleEntryClick}
            onArrowClick={toggleChildWikis}
            style={{ display: showCategoryList ? "block" : "none" }}
          />
          {
            <WikiContent
              Wiki={selectedEntry}
              isEditMode={isEditMode}
              onWikiEditButtonClick={handleWikiEditButtonClick}
              onWikiDeleteButtonClick={handleWikiDeleteClick}
              toggleEditMode={toggleEditMode}
              form={form}
              onFormChange={handleFormChange}
              editorRef={editorRef}
              parents={parents}
            />
          }
        </S.Container>
      </S.WikiWrapper>
    </>
  );
}
