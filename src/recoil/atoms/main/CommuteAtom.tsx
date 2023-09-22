import { atom } from 'recoil';

export const isCommuteState = atom({
    key : 'isCommuteState',
    default : false,
});

export const startTimeState = atom<Date | null>({
    key : 'startTimeState',
    default : null,
});