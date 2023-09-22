import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

const emailState = atom({
  key: 'emailState',
  default: undefined,

  effects_UNSTABLE: [persistAtom],
});

const uidState = atom({
  key: 'uidState',
  default: undefined,

  effects_UNSTABLE: [persistAtom],
});

const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const uid = get(uidState);
    const email = get(emailState);

    if (uid && email) {
      return true;
    }
    return false;
  },
});

export { emailState, uidState, isLoginSelector };
