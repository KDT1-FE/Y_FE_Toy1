import { atom } from 'recoil';


export const categoryNameState = atom<string[]>({
    key: 'categoryNameState',
    default: [],
  });


  export const categoryState = atom({
    key: 'categoryState',
    default: { item: '', isReadOnly: true }, // 초기값은 빈 문자열과 readonly true
  });

