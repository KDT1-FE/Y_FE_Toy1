import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
//유저 로그인 상태 유무 확인
export const authState = atom<boolean>({
  key: "authstate",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
// Modal창 상태 전역 관리
export const modalState = atom<boolean>({
  key: "modalstate",
  default: false,
});
// 이메일 비밀번호 상태 전역 관리
export const emailState = atom<string>({
  key: "emailState",
  default: "",
});

export const passwordState = atom<string>({
  key: "passwordState",
  default: "",
});
//현재 firebase에 있는 부서 타입
export interface Department {
  id: string;
  name: string; // 부서 이름
  teams: string[]; // 부서 안에 속해 있는 팀 이름
}
//현재 firebase에 있는 팀 타입
export interface Team {
  id: string;
  teamName: string; // Team Name
  userId: string; // Team 속해 있는 멤버
}
// 회원 정보 입력할 때 유저 정보 타입
export interface User {
  name: string;
  email: string;
  phone: string;
  department: string;
  team: string;
  position: string;
  access: string;
  photo: string;
}

// 부서 상태 전역 관리
export const departmentState = atom<Department[]>({
  key: "departmentList",
  default: [],
});

// 팀 상태 전역 관리
export const teamState = atom<Team[]>({
  key: "teamList",
  default: [],
});

// 선택한 부서 상태 전역 관리
export const selectedPartState = atom<string | undefined>({
  key: "sepectedDepartment",
  default: undefined,
});

// 선택한 팀 상태 전역 관리
export const selectedTeamState = atom<string | undefined>({
  key: "selectedTeam",
  default: undefined,
});
// 선택한 직급 상태 전역 관리
export const selectedPoState = atom<string | undefined>({
  key: "selectedPosition",
  default: undefined,
});
// 유저 회원 정보 전역 관리
export const userInfo = atom<User>({
  key: "userInfo",
  default: {
    name: "",
    email: "",
    phone: "",
    department: "",
    team: "",
    position: "",
    access: "",
    photo: "",
  },
});
