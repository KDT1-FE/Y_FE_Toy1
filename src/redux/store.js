import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';

// wiki page
const boardStateSlice = createSlice({
  name: 'boardState',
  initialState: { value: 'QA' },
  reducers: {
    qa: (state, action) => {
      state.value = action.payload;
    },
    free: (state, action) => {
      state.value = action.payload;
    },
    best: (state, action) => {
      state.value = action.payload;
    },
  },
});

const wikiStore = configureStore({
  reducer: {
    boardState: boardStateSlice.reducer,
  },
});

// 초기 상태 정의
const initialState = sessionStorage.getItem('uid')
  ? {
      uid: sessionStorage.getItem('uid'),
      email: sessionStorage.getItem('email'),
      nickname: sessionStorage.getItem('nickname'),
      image: sessionStorage.getItem('image'),
    }
  : { uid: null };

// 리듀서 정의
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        nickname: action.payload.nickname,
        image: action.payload.image,
      };
    case 'LOGOUT':
      return { ...state, uid: null };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(rootReducer);

store.subscribe(() => {
  sessionStorage.setItem('uid', store.getState().uid);
  sessionStorage.setItem('email', store.getState().email);
  sessionStorage.setItem('nickname', store.getState().nickname);
  sessionStorage.setItem('image', store.getState().image);
});

export { wikiStore, boardStateSlice, store };
