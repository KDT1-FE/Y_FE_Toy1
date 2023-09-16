import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'userId',
    storage: localStorage,
});

export const UserId = atom({
    key: 'userId',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const TimeLog = atom({
    key: 'timeLog',
    default: '',
});
