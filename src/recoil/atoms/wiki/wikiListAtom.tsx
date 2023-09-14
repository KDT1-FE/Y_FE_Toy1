import { atom } from 'recoil';

interface WikiListItem {
    id : string,
    category : string,
    title: string,
    content: string,
    createdAt : string
}

export const wikiListState = atom<WikiListItem[]>({
  key: 'wikiListState',
  default: [],
});

export const wikiListCategoryState = atom<string>({
    key : 'wikiListCategoryState',
    default : 'Show All',
})
