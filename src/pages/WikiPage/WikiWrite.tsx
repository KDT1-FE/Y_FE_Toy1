import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import MDEditor from "@uiw/react-md-editor";
import { getFirestore , collection, serverTimestamp , addDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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


export default function WikiWrite() {
  
  const [value, setValue] = React.useState<string | undefined>("");
  const db = getFirestore(app);
  const navigate = useNavigate();

  const categoryNames = useRecoilValue(categoryNameState);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('주요 기능');


  const handleButtonClick = () => {
    navigate('/wiki');
  }

  const handleSubmitBtnClick = async () => {
    try {
      const wikiCollection = collection(db, "/wiki");
      await addDoc(wikiCollection, {
        title,
        category,
        content: value,
        createdAt: serverTimestamp(),
      });
      
    }
    catch (error) {
      console.error('Error adding or updating wiki data', error);
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
