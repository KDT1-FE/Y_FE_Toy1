import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'timeLog', //원하는 key 값 입력
    storage: sessionStorage,
});
