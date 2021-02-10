import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import user from './user';

const rootReducer = combineReducers({
  user: user.reducer,
  common: common.reducer,
  auth: auth.reducer,
});

//* 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

// ? RootState를 상속하여 DefaultRootState 재정의
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends RootState {}
}

const initStore: MakeStore = () => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
