import React, { useEffect } from "react";
import { getFirestore , collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import {categoryNameState, categoryState} from "../../../recoil/atoms/wiki/CategoryAtom";
import app from '../../../firebaseSDK';
import { CateEditBtn } from "../../../styled/wiki/Button";
import { TitleText } from "../../../styled/wiki/Text";
import { CategoryHeaderContainer, CategoryListContainer } from "../../../styled/wiki/Container";
import CategoryItem from "./CategoryItem";


export default function Category() {
  const db = getFirestore(app);
  const [categoryNames, setCategoryNames] = useRecoilState(categoryNameState);
  const [category, setCategory] = useRecoilState(categoryState);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryCollection = collection(db, "/category");
        const querySnapshot = await getDocs(categoryCollection);

        const names : string[] = [];

        querySnapshot.forEach((document) => {
          const data = document.data();
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

  const handleEditClick = () => {
    console.log("edit");
    setCategory((prev) => ({
      ...prev,
      isReadOnly : !prev.isReadOnly,
    }))
  };

  const handleSaveClick = async () => {
    console.log(categoryNames);
    try {
      // Firestore에 데이터 업데이트
  
      // 업데이트할 카테고리의 객체를 담을 배열


      const updatedCategories = categoryNames.map((categoryName, index) => ({
        id: (index + 1).toString(),
        name: categoryName
      }));
      
      
      console.log(updatedCategories);
      // 모든 카테고리 데이터를 업데이트
      updatedCategories.forEach(async (updatedCategory) => {
        const categoryDocRef = doc(db, "category", updatedCategory.id);
        await setDoc(categoryDocRef, { name: updatedCategory.name }, { merge: true });
      });
      // Recoil 상태 업데이트
      setCategory((prev) => ({
        ...prev,
        isReadOnly: true, // 저장 후 다시 읽기 전용으로 변경
      }));
    } catch (error) {
      console.error("Error updating category data: ", error);
    }
  };

  return (
    <>
      <CategoryHeaderContainer>
        <TitleText>CATEGORY</TitleText>
        <CateEditBtn type="button" onClick={category.isReadOnly ? handleEditClick : handleSaveClick}>
          {category.isReadOnly ? "편집" : "저장"}
        </CateEditBtn>
      </CategoryHeaderContainer>
      <CategoryListContainer>
        {categoryNames.map((categoryName) => (
          <CategoryItem key={categoryName} item ={categoryName}/>
        ))}
        
      </CategoryListContainer>
    </>
  );
}
