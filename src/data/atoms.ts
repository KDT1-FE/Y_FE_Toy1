import { atom } from 'recoil';

interface commuteType {
  commute: boolean;
  startTime: number;
  endTime: number;
  workingTime: number;
}

export const commuteState = atom<commuteType>({
  key: 'commuteState',
  default: {
    commute: false,
    startTime: 0,
    endTime: 0,
    workingTime: 0,
  },
});
