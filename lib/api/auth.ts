import { UserType } from '../../typings/user';
import fetch from '.';

/**
 * 회원 가입 Body Type
 */
export interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

/**
 * 회원가입 API
 * @param body signup data
 * @returns userInfo
 */
export const signupAPI = (body: SignUpAPIBody) => fetch.post<UserType>('/api/auth/signup', body);

/**
 * 로그인 API
 * @param body
 * @returns
 */
export const loginAPI = (body: { email: string; password: string }) =>
  fetch.post<UserType>('/api/auth/login', body);

export const meAPI = () => fetch.get<UserType>('/api/auth/me');

// 로그아웃 API
export const logoutAPI = () => fetch.delete('/api/auth/logout');
