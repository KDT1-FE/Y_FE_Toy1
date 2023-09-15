import React, {useState } from "react";
import { useRecoilValue } from "recoil";
import MDEditor from "@uiw/react-md-editor";
import { collection, serverTimestamp , addDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { categoryNameState } from "../../recoil/atoms/wiki/CategoryAtom";
import {
  WikiWriteContainer,
  WikiWriteContentContainer,
  WikiWriteBtnContainer,
} from "../../styled/WikiPage/Container";
import { SubmitButton, WriteBackToListBtn } from "../../styled/WikiPage/Button";
import { TitleInput } from "../../styled/WikiPage/Input";
import CategorySelect from "../../styled/WikiPage/Select";
import {db} from '../../firebaseSDK';

export default function WikiWrite() {
  
  const [value, setValue] = React.useState<string | undefined>("");
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
        <WriteBackToListBtn type="button" onClick={handleButtonClick}>목록으로</WriteBackToListBtn>
        <SubmitButton type="button" onClick={handleSubmitBtnClick}>Submit</SubmitButton>
      </WikiWriteBtnContainer>
    </WikiWriteContainer>
  );
}
