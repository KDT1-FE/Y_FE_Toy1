import { atom, selector } from "recoil";
import { wikiListState } from "./wikiListAtom";

export const categoryNameState = atom<string[]>({
  key: "categoryNameState",
  default: [],
});


export const categoryState = atom({
  key: 'categoryState',
  default: { item: '', isReadOnly: true }, // 초기값은 빈 문자열과 readonly true
});


export const selectedCategoryState = atom<string | null>({
  key: "selectedCategoryState",
  default: null, // 선택된 카테고리가 없을 때는 null로 초기화
});

export const filteredWikiListSelector = selector({
  key: "filteredWikiListSelector",
  get: ({ get }) => {
    const selectedCategory = get(selectedCategoryState); // 선택된 카테고리 가져오기
    const wikiList = get(wikiListState); // 전체 아이템 목록 가져오기

    // 선택된 카테고리가 null 또는 "전체"인 경우 전체 아이템 목록 반환
    if (!selectedCategory || selectedCategory === "전체") {
      return wikiList;
    }

    // 선택된 카테고리에 해당하는 아이템들만 필터링하여 반환
    return wikiList.filter((item) => item.category === selectedCategory);
  },
});
