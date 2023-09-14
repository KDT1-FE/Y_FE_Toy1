import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirestore , collection,getDocs} from "firebase/firestore";
import {useRecoilState } from "recoil";
import { categoryNameState } from "../../../recoil/atoms/wiki/CategoryAtom";
import ContentList from './ContentList'
import ContentHeader from './ContentHeader'
import { ContentContainer  } from '../../../styled/wiki/Container'
import { AddBtn } from '../../../styled/wiki/Button'
import app from '../../../firebaseSDK';


export default function WikiContent() {
  const db = getFirestore(app);
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
  }, [setCategoryNames]);

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
