import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loginUpdate',
  initialState: { isLogin: false, name: '', email: '' },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.name = action.payload.userName;
      state.email = action.payload.userEmail;
    },
    logout: state => {
      state.isLogin = false;
      state.name = '';
      state.email = '';
    },
  },
});

export default loginSlice;
export const { login, logout } = loginSlice.actions;
