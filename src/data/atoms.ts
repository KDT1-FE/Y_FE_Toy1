import { atom } from 'recoil';

export interface commuteType {
  date: number;
  hasWorked: boolean;
  isWorking: boolean;
  startTime: number;
  endTime: number;
  workingTime: number;
}

export const defaultCommuteInfo: commuteType = {
  date: 0,
  hasWorked: false,
  isWorking: false,
  startTime: 0,
  endTime: 0,
  workingTime: 0,
};

export const commuteState = atom<commuteType>({
  key: 'commuteState',
  default: {
    date: 0,
    hasWorked: false,
    isWorking: false,
    startTime: 0,
    endTime: 0,
    workingTime: 0,
  },
});
