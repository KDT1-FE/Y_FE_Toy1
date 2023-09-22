import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '@store/loginSlice';

const store = configureStore({
  reducer: {
    loginUpdate: loginSlice.reducer,
  },
});

export default store;
