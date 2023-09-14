import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore , collection, getDocs, serverTimestamp , addDoc} from "firebase/firestore";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilState } from "recoil";
import {categoryNameState} from "../../recoil/atoms/wiki/CategoryAtom";
import {
  WikiWriteContainer,
  WikiWriteContentContainer,
  WikiWriteBtnContainer,
} from "../../styled/wiki/Container";
import { SubmitButton, BackToListBtn } from "../../styled/wiki/Button";
import { TitleInput } from "../../styled/wiki/Input";
import CategorySelect from "../../styled/wiki/Select";
import app from '../../firebaseSDK';
import { wikiListState } from "../../recoil/atoms/wiki/wikiListAtom";

interface WikiListItem {
  id : string,
  category : string,
  title: string,
  content: string,
  createdAt : string
}

export default function WikiWrite() {
  const [value, setValue] = React.useState<string | undefined>("");
  const db = getFirestore(app);
  const [categoryNames, setCategoryNames] = useRecoilState(categoryNameState);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('주요 기능');
  const [wikiList, setWikiList] = useRecoilState(wikiListState);
  const navigate = useNavigate();

  const fetchWikiList = async () => {
    try {
      const wikiCollection = collection(db, "/wiki");
      const querySnapshot = await getDocs(wikiCollection);
      const fetchedWikiList : WikiListItem[] = [];

      querySnapshot.forEach((d) => {
        const data = d.data();
        fetchedWikiList.push({
          id: d.id,
          category : data.category,
          title : data.title,
          content : data.content,
          createdAt : data.createdAt,
        });
      });
      return fetchedWikiList;
    }
    catch(error) {
      console.error('Error fetching wiki list', error);
      return []

    }

  }


  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryCollection = collection(db, "/category");
        const querySnapshot = await getDocs(categoryCollection);

        const names : string[] = [];

        const fetchedWikiList = await fetchWikiList();
        setWikiList(fetchedWikiList);
        

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.name;
          names.push(categoryName);
        });

        setCategoryNames(names);

      }
      catch(error) {
        console.error("Error fetching category names : " ,error);
      }
    };
    fetchCategoryName();
  },[setCategoryNames]);


  const handleButtonClick = () => {
    navigate(-1);
    }

  const handleSubmitBtnClick = async () => {
    console.log(wikiList);
    console.log(title, category, value, serverTimestamp());
    
    try {
      const wikiCollection = collection(db, "/wiki");
      await addDoc(wikiCollection, {
        title,
        category,
        content : value,
        createdAt : serverTimestamp(),
      });

    }
    catch(error) {
      console.error('Error adding wiki data', error);

    }
    navigate(-1);

  }

  return (
    <WikiWriteContainer>
      <WikiWriteContentContainer>
        <TitleInput 
        type="text" 
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)} />
        <CategorySelect
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
