import {createSlice,configureStore} from '@reduxjs/toolkit'

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

const store = configureStore({
  reducer:{
    boardState:boardStateSlice.reducer
  }
})

export {store,boardStateSlice}