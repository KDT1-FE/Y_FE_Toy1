import React from "react";
import { CateEditBtn } from "../../../styled/wiki/Button";
import { TitleText } from "../../../styled/wiki/Text";
import { CategoryHeaderContainer, CategoryListContainer } from "../../../styled/wiki/Container";
import CategoryItem from "./CategoryItem";

export default function Category() {
  return (
    <>
      <CategoryHeaderContainer>
        <TitleText>CATEGORY</TitleText>
        <CateEditBtn type="button">편집</CateEditBtn>
      </CategoryHeaderContainer>
      <CategoryListContainer>
        <CategoryItem />
      </CategoryListContainer>
    </>
  );
}
