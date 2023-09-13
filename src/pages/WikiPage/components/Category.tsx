import React, { useEffect } from "react";
import { getFirestore , collection, getDocs } from "firebase/firestore";
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

  const handleEditClick = () => {
    setCategory((prev) => ({
      ...prev,
      isReadOnly : !prev.isReadOnly,
    }))
  };

  const handleSaveClick = async () => {
    console.log("save");
    setCategory((prev) => ({
      ...prev,
      isReadOnly: true, // 저장 후 다시 읽기 전용으로 변경
  }));
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
          <CategoryItem item ={categoryName}/>
        ))}
        
      </CategoryListContainer>
    </>
  );
}
