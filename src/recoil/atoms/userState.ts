import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

interface UserStateDefault {
  isLogin: boolean;
  userInfo: unknown;
  userData: unknown;
}

const defaultValue: UserStateDefault = {
  isLogin: false,
  userInfo: null,
  userData: null,
};

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

const userState = atom({
  key: 'userInfo',
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});

export default userState;
