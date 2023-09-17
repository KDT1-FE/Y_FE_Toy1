import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: 'userId',
    storage: sessionStorage,
});

export const UserId = atom({
    key: 'userId',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// 타이머 ON/OFF
export const TimerOn = atom({
    key: 'TimerOn',
    default: false,
});

// 입퇴실 기록
export const TimeLog = atom({
    key: 'TimeLog',
    default: '',
});

export const SlideOn = atom({
    key: 'SlideOn',
    default: false,
});
