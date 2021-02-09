import { UserType } from './user.d';

//* 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};

//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};
