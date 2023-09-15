import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { collection,getDocs} from "firebase/firestore";
import {useRecoilState } from "recoil";
import { categoryNameState } from "../../../recoil/atoms/wiki/CategoryAtom";
import ContentList from './ContentList'
import ContentHeader from './ContentHeader'
import { ContentContainer  } from '../../../styled/WikiPage/Container'
import { AddBtn } from '../../../styled/WikiPage/Button'
import {db} from '../../../firebaseSDK';


export default function WikiContent() {
  const [, setCategoryNames] = useRecoilState(categoryNameState);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryCollection = collection(db, "/category");
        const querySnapshot = await getDocs(categoryCollection);

        const names: string[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const categoryName = data.name;
          names.push(categoryName);
        });

        setCategoryNames(names);

      }
      catch (error) {
        console.error("Error fetching category names : ", error);
      }
    };
    fetchCategoryName();
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/wiki/write');
    }
  return (
    <ContentContainer>
      <AddBtn type='button' onClick={handleButtonClick}>추가하기</AddBtn>
      <ContentHeader />
      <ContentList />

    </ContentContainer>
  )
}
