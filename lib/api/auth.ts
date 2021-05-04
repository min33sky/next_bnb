import { UserType } from '../../typings/user';
import axios from '.';

export interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 API
export const signupAPI = (body: SignUpAPIBody) => axios.post<UserType>('/api/auth/signup', body);

// 로그인 API
export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

export const meAPI = () => axios.get<UserType>('/api/auth/me');

// 로그아웃 API
export const logoutAPI = () => axios.delete('/api/auth/logout');
