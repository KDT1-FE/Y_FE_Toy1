import { atom } from "recoil";
import { ProjectInfo } from "../libs/firestore";

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});
export interface projectListType {
  [key: string]: ProjectInfo[];
}
export const projectListState = atom<projectListType>({
  key: "projectListState",
  default: {
    plus: [],
    progress: [],
    completed: [],
  },
});
