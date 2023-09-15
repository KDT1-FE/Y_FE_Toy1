import {createSlice,configureStore} from '@reduxjs/toolkit'
import { createStore } from 'redux';

// wiki page 
const boardStateSlice = createSlice({
    name:'boardState',
    initialState:{value:'QA'},
    reducers:{
        qa:(state,action)=>{
        
            state.value = action.payload; 
        },
        free:(state,action)=>{
          
          state.value = action.payload; 
        },
        best:(state,action)=>{
          
          state.value = action.payload; 
        },
        
    }
})

const wikiStore = configureStore({
  reducer:{
    boardState:boardStateSlice.reducer
  }
})



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


export {wikiStore,boardStateSlice,store}