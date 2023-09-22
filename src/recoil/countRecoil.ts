import React from 'react';
import { recoilPersist } from 'recoil-persist';
import { atom, selector } from 'recoil';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

const countState = atom({
  key: 'countState',
  default: 0,

  effects_UNSTABLE: [persistAtom],
});

const countIdState = atom({
  key: 'countIdState',
  default: undefined,

  effects_UNSTABLE: [persistAtom],
});

const countIdSelector = selector({
  key: 'countIdSelector',
  get: ({ get }) => {
    const countId = get(countIdState);
    return countId;
  },
});

const isCountSelector = selector({
  key: 'isCountSelector',
  get: ({ get }) => {
    const count = get(countState);
    return count > 0;
  },
});

export { countState, countIdState, isCountSelector, countIdSelector };
