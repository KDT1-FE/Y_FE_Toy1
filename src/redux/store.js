import {createSlice,configureStore} from '@reduxjs/toolkit'

const boardStateSlice = createSlice({
    name:'boardState',
    initialState:{value:'QA'},
    reducers:{
        qa:(state,action)=>{
            return state.value = action.step; 
        },
        free:(state,action)=>{
            return state.value = action.step; 
        },
        best:(state,action)=>{
            return state.value = action.step; 
        },
        
    }
})

const store = configureStore({
  reducer:{
    boardState:boardStateSlice.reducer
  }
})

export {store}