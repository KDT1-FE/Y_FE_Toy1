import React, { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useRecoilState } from "recoil";
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { categoryNameState, categoryState } from "../../../recoil/atoms/wiki/CategoryAtom";
import app from '../../../firebaseSDK';
import { CateEditBtn } from "../../../styled/wiki/Button";
import { TitleText } from "../../../styled/wiki/Text";

import { CategoryHeaderContainer, CategoryListContainer } from "../../../styled/wiki/Container";
import { CategoryItemContainer } from '../../../styled/wiki/Item';
import CategoryItem from "./CategoryItem";

export default function Category() {
  const db = getFirestore(app);
  const [categoryNames, setCategoryNames] = useRecoilState(categoryNameState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [newCategoryName, setNewCategoryName] = useState(""); // 새 카테고리를 입력할 상태

  const handleEditClick = () => {
    setCategory((prev) => ({
      ...prev,
      isReadOnly: !prev.isReadOnly,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // 새 카테고리를 Recoil 상태에 추가
      setCategoryNames([...categoryNames, newCategoryName]);

      // Firestore에 새 카테고리 추가
      const categoryCollection = collection(db, "category");
      await addDoc(categoryCollection, { name: newCategoryName });

      // Recoil 상태 업데이트
      setCategory((prev) => ({
        ...prev,
        isReadOnly: true,
      }));
      
      // 입력 필드 초기화
      setNewCategoryName("");
    } catch (error) {
      console.error("Error updating category data: ", error);
    }
  };

  return (
    <>
      <CategoryHeaderContainer>
        <TitleText>CATEGORY</TitleText>
        <CateEditBtn type="button" onClick={category.isReadOnly ? handleEditClick : handleSaveClick}>
          {category.isReadOnly ? "추가" : "저장"}
        </CateEditBtn>
      </CategoryHeaderContainer>
      <CategoryListContainer>
        <CategoryItemContainer>
          <FolderOpenOutlinedIcon color='action' />
          전체
        </CategoryItemContainer>
        {categoryNames.map((categoryName) => (
          <CategoryItem key={categoryName} item={categoryName} />
        ))}
        {!category.isReadOnly && (
          // 카테고리 추가 모드일 때 입력 필드 표시
          <CategoryItemContainer>
            <input
              type="text"
              placeholder="새 카테고리 추가"
              value={newCategoryName}
              style={{width : "120px" }}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </CategoryItemContainer>
        )}
      </CategoryListContainer>
    </>
  );
}
