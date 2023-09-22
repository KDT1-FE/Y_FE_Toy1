import { atom } from "recoil";

export const userAccessState = atom<string | null>({
  key: "userAccessState",
  default: null,
});

export const selectedUserIdsState = atom<string[]>({
  key: "selectedUserIdsState",
  default: [],
});

export const userIdsState = atom<string[]>({
  key: "userIdsState",
  default: [],
});
