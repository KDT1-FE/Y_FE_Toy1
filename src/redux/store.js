import { createStore } from 'redux';

// 초기 상태 정의
const initialState = sessionStorage.getItem('user')
  ? { user: sessionStorage.getItem('user') }
  : { user: null };

// 리듀서 정의
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(rootReducer);

store.subscribe(() => {
  sessionStorage.setItem('user', store.getState().user);
});

export default store;
