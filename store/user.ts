import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'typings/reduxState';
import { UserType } from 'typings/user';

const initialState: UserState = {
  id: 0,
  email: '',
  lastname: '',
  firstname: '',
  birthday: '',
  isLogged: false,
  profileImage: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //* 로그인한 유저 변경하기
    setLoggedUser(state, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
    //* 유저 초기화하기 (ex. 로그아웃)
    initUser(state) {
      state = initialState;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
