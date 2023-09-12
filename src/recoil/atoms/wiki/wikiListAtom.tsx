import { atom } from 'recoil';

interface WikiListItem {
    category : string,
    title: string,
    content: string,
    date : string
}

export const wikiListState = atom<WikiListItem[]>({
  key: 'wikiListState',
  default: [],
});

export const wikiListCategoryState = atom<string>({
    key : 'wikiListCategoryState',
    default : 'Show All',
})
