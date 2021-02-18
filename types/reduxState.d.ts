import { UserType } from './user.d';

//* 유저 Redux state (서버에서 응답한 유저 객체 타입에 로그인 여부를 추가시킴)
export type UserState = UserType & {
  isLogged: boolean;
};

//* 공통 Redux state
export type CommonState = {
  validateMode: boolean; // 입력값에 대한 검증 모드 유무
};
