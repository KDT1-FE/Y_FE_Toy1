import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserId = atom({
    key: 'userId',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const channelState = atom({
    key: 'channelState',
    default: '',
});

export const subChannelState = atom({
    key: 'subChannelState',
    default: '',
});

export const RecruitmentData = atom({
    key: 'recruitmentData',
    default: {},
});
