
import React, {useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import MDEditor from "@uiw/react-md-editor";
import { collection, serverTimestamp , doc, setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { categoryNameState } from "../../recoil/atoms/wiki/CategoryAtom";
import { wikiListState } from "../../recoil/atoms/wiki/wikiListAtom";
import {
  WikiWriteContainer,
  WikiWriteContentContainer,
  WikiWriteBtnContainer,
} from "../../styled/WikiPage/Container";
import { SubmitButton, BackToListBtn } from "../../styled/WikiPage/Button";
import { TitleInput } from "../../styled/WikiPage/Input";
import CategorySelect from "../../styled/WikiPage/Select";
import {db} from '../../firebaseSDK';

export default function WikiEdit() {
  
  const [value, setValue] = React.useState<string | undefined>("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('주요 기능');

  const navigate = useNavigate();

  const categoryNames = useRecoilValue(categoryNameState);
  const wikiList = useRecoilValue(wikiListState);

  // URL에서 id 파라미터 가져오기
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  // id에 해당하는 항목 찾기
  const selectedItem = wikiList.find(item => item.id === id);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setCategory(selectedItem.category);
      setValue(selectedItem.content);
    } else {
      // selectedItem이 없는 경우 처리 (예: 기본값 설정)
      setTitle('');
      setCategory('주요 기능');
      setValue('');
    }
  }, [selectedItem]);

  
  const handleButtonClick = () => {
    navigate('/wiki');
  }

  const handleSubmitBtnClick = async () => {
    try {
      const wikiCollection = collection(db, "/wiki");
      if(selectedItem) {
        const docRef = doc(wikiCollection, selectedItem.id);
        await setDoc(docRef, {
        title,
        category,
        content: value,
        createdAt: serverTimestamp(),
      });

      }
      
      
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
