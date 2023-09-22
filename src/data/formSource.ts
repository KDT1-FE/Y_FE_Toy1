import CustomForm from "../components/common/CustomForm";
import { SELECT_OPTIONS } from "../constant/member";
const { required, max, pattern } = CustomForm.useValidate();

export const userInputs = [
  {
    name: "name",
    label: "이름",
    rules: [required(), max(20)],
  },
  {
    name: "email",
    label: "이메일",
    rules: [required(), max(20)],
  },
  {
    name: "phone",
    label: "전화",
    rules: [
      required(),
      pattern(
        /^(\d{11}|\d{3}-\d{4}-\d{4})$/,
        "전화번호는 '-'를 포함해야 합니다.",
      ),
    ],
  },
];

export const userSelect = [
  {
    name: "department",
    label: "부서",
    options: SELECT_OPTIONS.department,
    placeholder: "부서 선택",
    rules: [required()],
  },
  {
    name: "position",
    label: "직책",
    options: SELECT_OPTIONS.position,
    placeholder: "직책 선택",
    rules: [required()],
  },
  {
    name: "access",
    label: "권한",
    options: SELECT_OPTIONS.access,
    placeholder: "권한 선택",
    rules: [required()],
  },
];

export const teamInputs = [
  {
    name: "teamName",
    label: "팀 이름",
    rules: [required(), max(20)],
  },
];

export const teamSelect = [
  {
    name: "department",
    label: "부서",
    options: SELECT_OPTIONS.department,
    place: "option",
    rules: [required()],
  },
];

export const teamTextAreas = [
  {
    name: "teamDescription",
    label: "팀 설명",
    rules: [required(), max(300)],
  },
];
