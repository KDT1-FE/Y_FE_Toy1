import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserId = atom({
    key: 'userId',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
