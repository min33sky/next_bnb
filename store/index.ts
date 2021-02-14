import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import registerRoom from './registerRoom';
import user from './user';

//* 리듀서들을 하나로 합쳐준다.
const rootReducer = combineReducers({
  user: user.reducer,
  common: common.reducer,
  auth: auth.reducer,
  registerRoom: registerRoom.reducer,
});

//* 스토어 타입 (useSelector의 타입을 지정할 때 필요)
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
    devTools: process.env.NODE_ENV !== 'production', // 개발 모드일때만 DevTools 작동
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
