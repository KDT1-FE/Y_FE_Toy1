import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore , collection, serverTimestamp , addDoc,doc, setDoc} from "firebase/firestore";
import MDEditor from "@uiw/react-md-editor";
import {useRecoilValue } from "recoil";
import { categoryNameState } from "../../recoil/atoms/wiki/CategoryAtom";
import {
  WikiWriteContainer,
  WikiWriteContentContainer,
  WikiWriteBtnContainer,
} from "../../styled/wiki/Container";
import { SubmitButton, BackToListBtn } from "../../styled/wiki/Button";
import { TitleInput } from "../../styled/wiki/Input";
import CategorySelect from "../../styled/wiki/Select";
import app from '../../firebaseSDK';
import { selectedItemSelector } from "./ItemContent";

export default function WikiWrite() {
  const [value, setValue] = React.useState<string | undefined>("");
  const db = getFirestore(app);
  const categoryNames = useRecoilValue(categoryNameState);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('주요 기능');
  const navigate = useNavigate();

  const selectedItem = useRecoilValue(selectedItemSelector);

  // 1번 경로로 들어왔을 때 selectedItem이 null인 경우의 처리
  useEffect(() => {
    if (selectedItem === null) {
      // 아무 아이템을 선택하지 않은 상태이므로 초기화
      setTitle("");
      setCategory("주요 기능");
      setValue("");
    }
    else {
      // selectedItem이 존재하는 경우는 2번 경로로 들어왔을 때
      // selectedItem을 기반으로 필요한 작업 수행
      setTitle(selectedItem.title);
      setCategory(selectedItem.category);
      setValue(selectedItem.content);
    }
  }, [selectedItem]);

  const handleButtonClick = () => {
    navigate('/wiki');
  }

  const handleSubmitBtnClick = async () => {

    try {
      const wikiCollection = collection(db, "/wiki");
      
      if (selectedItem) {
        const docRef = doc(wikiCollection, selectedItem.id);
        await setDoc(docRef, {
          title,
          category,
          content: value,
          createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(wikiCollection, {
          title,
          category,
          content: value,
          createdAt: serverTimestamp(),
        });
      }

    }
    catch (error) {
      console.error('Error adding wiki data', error);

    }
    navigate('/wiki');
  }

  return (
    <WikiWriteContainer>
      <WikiWriteContentContainer>
        <TitleInput 
          type="text" 
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </CategorySelect>
        <MDEditor
          height={600}
          value={value}
          onChange={setValue}
          style={{ width: "100%" }}
        />
      </WikiWriteContentContainer>
      <WikiWriteBtnContainer>
        <BackToListBtn type="button" onClick={handleButtonClick}>목록으로</BackToListBtn>
        <SubmitButton type="button" onClick={handleSubmitBtnClick}>Submit</SubmitButton>
      </WikiWriteBtnContainer>
    </WikiWriteContainer>
  );
}
