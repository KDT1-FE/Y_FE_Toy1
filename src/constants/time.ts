export const INTERVAL = 1000;

export const WORK_TIME_INITIAL_VALUE = 0;

export const WORK_STATE_BUTTON = {
  COMMUTE: '출근',
  FINISH: '퇴근',
  RESTART: '재시작',
  OKAY: '확인',
} as const;

export const WORK_STATE_TEXT = {
  REST_TIME: '휴게 시간',
  BEFORE_COMMUTE: '출근 전',
} as const;

export const COMMUTE_LIST_STATE = {
  START_INDEX: 0,
  LAST_INDEX: 5,
} as const;
