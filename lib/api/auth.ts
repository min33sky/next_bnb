import { UserType } from '../../types/user.d';
import axios from '.';

export interface SignUpAPIBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

// 회원가입 API
export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup', body);
